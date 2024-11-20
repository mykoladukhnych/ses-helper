import { View, ActivityIndicator, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchServices } from '../services'
import Card from '../components/Card'

const ServicesScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const services = useSelector(state => state.services);
	const servicesList = [];

	useEffect(() => {
		fetchServices(dispatch);
	}, []);

	for (let key in services.data) {
		servicesList.push(<Card data={services.data[key]} screenName={key} navigation={navigation} key={key} />);		
	}	

	return (
		<View>
			{
				services.loading ? <ActivityIndicator size={'large'} color={'#000FF'} /> : servicesList
			}
			
		</View>
	)
}

export default ServicesScreen