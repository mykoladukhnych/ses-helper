import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const InfoScreen = () => {
	const { theme } = useSelector(state => state.theme);

	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text style={{color: theme.colors.text, textAlign: 'center', fontSize: 20}}>Упс... Скоро буде</Text>
		</View>
	)
}

export default InfoScreen