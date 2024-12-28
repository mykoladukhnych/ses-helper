import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfo } from '../services';
import Card from '../components/Card';

const InfoScreen = ({ navigation }) => {
	const { theme } = useSelector(state => state.theme);
	const [loading, setLoading] = useState(false);
	const information = useSelector(state => state.information);
	const dispatch = useDispatch();
	const renderItems = [];

	useEffect(() => {
		fetchInfo(dispatch)
	}, [])

	Object.keys(information.data).forEach((item, i) => {
		renderItems.push(
			<Card 
				data={{ left: <Text style={{fontSize: 16, fontWeight: 600, color: theme.colors.text,}}>{information.data[item].title}</Text> }} 
				onPress={() => {
					item.url ? 
						navigation.navigate('pdfviewer', {url: information.data[item].url})
					: navigation.push('Dynamic', {screenName:information.data[item].title, data: information.data[item].list})
				}}
				key={i}
			/>
		)
		
	})

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