import { ActivityIndicator, ScrollView, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import { useFirebaseData } from '../hooks/useFirebaseData'

const ServicesScreen = ({ navigation }) => {
	const {fetchServices} = useFirebaseData();
	const services = useSelector(state => state.services);
	const { theme } = useSelector(state => state.theme);
	const [renderItems, setRenderItems] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchServices().finally(() => setLoading(false))
	}, []);

	useEffect(() => {
		if (services) {
			const items = Object.keys(services).map(key => {
				return (
					<Card data={{
						left: <Text style={{fontSize: 16, fontWeight: 700, color: theme.colors.text,}}>{services[key].title}</Text>,
						payload: services[key].url ? services[key].url : null
					}} 
					onPress={
						() => {
							services[key].url ? 
								navigation.navigate('pdfviewer', {url: services[key].url, title: services[key].title})
							: navigation.navigate(key);
						}
					}
					key={key} 
				/>
				)
			});

			setRenderItems(items);
		}
	}, [services]);

	return (
		<ScrollView>
			{
				loading ? <ActivityIndicator size={'large'} color={theme.colors.text} /> : renderItems
			}
		</ScrollView>
	)
}

export default ServicesScreen
