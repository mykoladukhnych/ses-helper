import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const ServicesScreen = () => {
	const authState = useSelector(state => state.auth);
	const dispatch = useDispatch();

	return (
		<View>
			<Text>ServicesScreen</Text>
			<Button title='Click' onPress={() => { console.log(authState) }}/>
			<Button title='Вихід' onPress={() => {
				FIREBASE_AUTH.signOut();
				dispatch(logout());
			}} />
		</View>
	)
}

export default ServicesScreen