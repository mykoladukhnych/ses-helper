import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const InfoScreen = () => {
	const { theme } = useSelector(state => state.theme);
	const [loading, setLoading] = useState(false);

	const renderItems = [];

	return (
		<View style={{flex: 1}}>
			<ScrollView>
				{
					loading ? 
						<ActivityIndicator size={'large'} color={theme.colors.text} /> 
					: renderItems.length === 0 ? 
						<Text style={{textAlign: 'center', color: theme.colors.placeholder, fontSize: 20,}}>Тут поки нічого немає...</Text> 
					: renderItems
				}
			</ScrollView>
		</View>
	)
}

export default InfoScreen