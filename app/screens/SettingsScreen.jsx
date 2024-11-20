import { View, Button } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../firebaseConfig';

import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice'


const SettingsScreen = () => {
	const dispatch = useDispatch();

	return (
		<View>
			<Button title='Вихід' onPress={() => {
				FIREBASE_AUTH.signOut();
				dispatch(logout());
			}} />
		</View>
	)
}

export default SettingsScreen