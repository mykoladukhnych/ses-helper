import { View, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';

import {  useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/slices/authSlice';

import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';

import { fetchUserData } from '../services';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const loading = useSelector(state => state.auth.loading);
	const dispatch = useDispatch();	

	useEffect(() => {
		dispatch(setLoading(true));
		onAuthStateChanged(FIREBASE_AUTH, user => {
			if (user) {
				fetchUserData(user.uid, user.email, user.accessToken, dispatch);
			} else {
				dispatch(setLoading(false));
			}
		});
	},[]);

    const signIn = async () => {
		dispatch(setLoading(true));
		try {
			const { user } = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
			if (user) {
				fetchUserData(user.uid, user.email, user.accessToken, dispatch);
			} else {
				dispatch(setLoading(false));
			}
		} catch (error) {
			switch(error.code) {
				case 'auth/invalid-credential':
					alert('Невірна пошта або пароль!');
					break;
				case 'auth/too-many-requests':
					alert('Забагато спроб. Зверніться до адміністратора!')
					break;
				default:
					alert(error);
					break;
			}
			dispatch(setLoading(false));
		}
    }

	return (		
		<View style={styles.container}>
			<TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={text => setEmail(text)} />
			<TextInput value={password} style={styles.input} placeholder='Password' autoCapitalize='none' onChangeText={text => setPassword(text)} secureTextEntry={true} />
			{
				loading ? <ActivityIndicator size={'large'} color={'#000FF'} /> : <Button title='Вхід' onPress={signIn} />
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		justifyContent: 'center',
		alignItemsL: 'center'
	},
	input: {
		padding: 10,
		marginBottom: 15,
		backgroundColor: '#fff',
		fontSize: 15,
		borderRadius: 5
	},
})

export default LoginScreen;