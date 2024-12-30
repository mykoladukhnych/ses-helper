import { View, ScrollView, Text, ActivityIndicator, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import AddOrderModal from '../components/AddOrderModal';
import OrderItem from '../components/OrderItem';
import { useOrders } from '../hooks/useOrders';

const OrdersScreen = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [renderItems, setRenderItems] = useState([]);
	const [loading, setLoading] = useState(false);	
	const { theme } = useSelector(state => state.theme);
	const { orders } = useOrders();

	useEffect(() => {
		const processData = async () => {
			setLoading(true);
			const items = await orders.map((item, i) => <OrderItem item={item} index={i} key={i}/>)
			setRenderItems(items);
			setLoading(false);
		}

		processData();
		
	}, [orders])

	return (
		<View style={{flex: 1, paddingVertical: 10}}>
			<ScrollView>
				{
					loading ? 
						<ActivityIndicator size={'large'} color={theme.colors.text} /> 
					: renderItems.length === 0 ? 
						<Text style={{textAlign: 'center', color: theme.colors.placeholder, fontSize: 20,}}>Тут поки нічого немає...</Text> 
					: renderItems
				}
			</ScrollView>	
			<AddOrderModal 
				visible={modalVisible}  
				onClose={() => setModalVisible(false)}
			/>
			<Button 
				title={{
					text: 'Додати'
				}}
				onPress={() => {setModalVisible(true)}}
			/>
		</View>
	)
}

export default OrdersScreen;

