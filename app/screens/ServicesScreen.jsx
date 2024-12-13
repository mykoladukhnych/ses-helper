import { ActivityIndicator, ScrollView, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../services'
import Card from '../components/Card'

const ServicesScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const services = useSelector(state => state.services);
	const { theme } = useSelector(state => state.theme);
	const renderItems = [];

	useEffect(() => {
		fetchServices(dispatch);
	}, []);

	for (let key in services.data) {
		renderItems.push(
			<Card data={{
					left: <Text style={{fontSize: 16, fontWeight: 700, color: theme.colors.text,}}>{services.data[key].title}</Text>,
					payload: services.data[key].url ? services.data[key].url : null
				}} 
				screenName={key === 'warranty' || key === 'easypro' ? key : 'pdfviewer'} 
				navigation={navigation} 
				key={key} 
			/>
		);		
	}	

	return (
		<ScrollView>
			{
				services.loading ? <ActivityIndicator size={'large'} color={theme.colors.text} /> : renderItems
			}
		</ScrollView>
	)
}

export default ServicesScreen
