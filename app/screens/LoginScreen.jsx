import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../store/slices/authSlice';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import Input from '../components/Input';
import { fetchUserData } from '../services';
import Button from '../components/Button';

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
			<Input placeholder='Email'  setOutsideState={setEmail} />
			<Input placeholder='Password' setOutsideState={setPassword} type={'password'} />
			{
				loading ? 
					<ActivityIndicator size={'large'} color={'#000FF'} /> 
				: <Button 
					title={{
						text: 'Вхід'
					}}
					onPress={signIn}
					buttonStyle={{width: '100%'}}
				/>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default LoginScreen;