import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { useFirebaseData } from '../hooks/useFirebaseData';

const InfoScreen = ({ navigation }) => {
	const { theme } = useSelector(state => state.theme);
	const { fetchInformation } = useFirebaseData();
	const [loading, setLoading] = useState(false);
	const information = useSelector(state => state.information);
	const [renderItems, setRenderItems] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetchInformation().finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		if (information) {
			const items = Object.keys(information).map((key, i) => {
				return (
					<Card 
						data={{ left: <Text style={{fontSize: 16, fontWeight: 600, color: theme.colors.text,}}>{information[key].title}</Text> }} 
						onPress={() => {
							information[key].url ? 
								navigation.navigate('pdfviewer', {url: information[key].url})
							: information[key].list ? navigation.push('Dynamic', {screenName:information[key].title, data: information[key].list})
							: null
						}}
						key={i}
					/>
				)
			});
			setRenderItems(items);
		}
	}, [information]);

	return (
		<View style={{flex: 1}}>
			<ScrollView style={{flex: 1}}>
				{
					loading ? 
						<ActivityIndicator size={'large'} color={'white'} /> 
					: renderItems
				}
			</ScrollView>
		</View>
	)
}

export default InfoScreen