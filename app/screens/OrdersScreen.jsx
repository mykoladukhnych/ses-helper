import { View, Modal, ScrollView, Text, StyleSheet, ActivityIndicator, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import Accordion from '../components/Accordion';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { FIREBASE_DB } from '../../firebaseConfig'
import { setOrders, setUser } from '../store/slices/authSlice';

const OrdersScreen = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);	

	const [loadingIndicator, setLoadingIndicator] = useState({
		index: null,
		action: null
	}); 

	const [orderModel, setOrderModel] = useState('');
	const [clientName, setClientName] = useState('');
	const [clientPhone, setClientPhone] = useState('');
	const [clientEmail, setClientEmail] = useState('');
	const [clientAddress, setClientAddress] = useState('');

	const { theme } = useSelector(state => state.theme);
	const user = useSelector(state => state.auth.user);

	const dispatch = useDispatch();

	const addOrderToFirestore = async (userId, newOrder) => {
		setLoadingIndicator({
			index: null,
			action: 'addOrder'
		});
		try {
		  	const userDocRef = doc(FIREBASE_DB, "users", userId);
	  
		  	await updateDoc(userDocRef, {
				orders: arrayUnion(newOrder),
		  	});
		  dispatch(setOrders([...user.orders, newOrder]));
		  setModalVisible(false);
		} catch (error) {
		  console.error("Error adding order: ", error);
		}
		finally {
			setLoadingIndicator({
				index: null,
				action: null
			});
		}
	};

	const updateOrderStatus = async (userId, orderIndex, newStatus) => {
		setLoadingIndicator({
			index: orderIndex,
			action: 'updateOrderStatus'
		});
		const userRef = doc(FIREBASE_DB, "users", userId);
		try {
			const docSnap = await getDoc(userRef);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				const orders = userData.orders;
		
				if (orders && orders[orderIndex]) {
					orders[orderIndex].status = newStatus;
					await updateDoc(userRef, { orders });
					dispatch(setOrders(orders));

				} else {
					alert("Замовлення за індексом не знайдено!");
				}
			} else {
				alert("Документ користувача не існує!");
			}
		} catch (error) {
			alert("Помилка оновлення статусу:", error);
		}
		finally {
			setLoadingIndicator({
				index: null,
				action: null
			});
		}
	};

	const deleteOrderByIndex = async (userId, indexToRemove) => {
		setLoadingIndicator({
			index: indexToRemove,
			action: 'deleteOrder'
		});
		try {
		  	const userDocRef = doc(FIREBASE_DB, "users", userId);
			const orders = user.orders.filter((_, index) => index !== indexToRemove);

			await updateDoc(userDocRef, { orders });
			dispatch(setOrders(orders))
			
		} catch (error) {
		  console.error("Помилка при видаленні замовлення:", error);
		}
		finally {
			setLoadingIndicator({
				index: null,
				action: null
			});
		}
	};

	const accordionData = (item, i) => {
		return (
			<View>
				<View>
					{ item.client.name ? <Text style={{color: theme.colors.text, marginVertical: 5, fontSize: 14}} key={'client'}>{`Клієнт: ${item.client.name}`}</Text> : null }
					{ item.client.phone ? <Text style={{color: theme.colors.text, marginVertical: 5, fontSize: 14}} key={'phone'}>{`Телефон: ${item.client.phone}`}</Text>  : null }
					{ item.client.email ? <Text style={{color: theme.colors.text, marginVertical: 5, fontSize: 14}} key={'email'}>{`Пошта: ${item.client.email}`}</Text> : null }
					{ item.client.address ? <Text style={{color: theme.colors.text, marginVertical: 5, fontSize: 14}} key={'address'}>{`Адреса: ${item.client.address}`}</Text> : null } 
				</View>

				<View style={{flexDirection: 'row', justifyContent: 'flex-end' }}>
					{
						loadingIndicator.index === i && loadingIndicator.action === 'updateOrderStatus' ? <ActivityIndicator size={'small'} color={theme.colors.text} style={{margin: 21}} />
						: <Button 
								title={{
									text: item.status === 'running' ? "Виконано" : "В роботу"
								}}
								onPress={() => {		
									const newStatus = user.orders[i].status === "running" ? "done" : "running";
									updateOrderStatus(user.id, i, newStatus);
								}}
							/>
					}
				</View>
			</View>
		)
	}

	const renderItems = user.orders.map((item, i) => {
		return(
			<Accordion 
				header={{
					left: <Text style={{fontSize: 14, fontWeight: 700, color: theme.colors.text}}>{item.model}</Text>,
					right: <Pressable
							onPress={async () => {
								Alert.alert(
									"Підтвердження", 
									"Видалити замовлення?", 
									[
									  {
										text: "Так",
										onPress: () => deleteOrderByIndex(user.id, i),
									  },
									  {
										text: "Ні",
										style: "cancel",
									  },
									],
									{ cancelable: false } 
								  );
							}}
						>
							{ loadingIndicator.action === 'deleteOrder' ? <ActivityIndicator size={24} color={theme.colors.text} /> : <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" /> }
						</Pressable>
				}} 	
				content={{
					corners: {},
					data: accordionData(item, i)
				}}
				style={{
					titleContainer: { backgroundColor: item.status === 'done' ? 'green' : theme.colors.card },
					content: {padding: 0, paddingHorizontal: 15, paddingTop: 10}
				}}
				key={i}
			/>
		)
	});


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
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
				  Alert.alert('Modal has been closed.');
				  setModalVisible(!modalVisible);
				}}
			>
				<View style={{...styles.centeredView, backgroundColor: theme.colors.background}}>
					<View style={{...styles.modalView, backgroundColor: theme.colors.card}}>
						<Input setOutsideState={setOrderModel} placeholder={"Введіть модель пристрою..."}/>
						<Input setOutsideState={setClientName} placeholder={"Введіть ім'я клієнта..."}/>
						<Input setOutsideState={setClientPhone} placeholder={"Введіть телефон клієнта..."}/>
						<Input setOutsideState={setClientEmail} placeholder={"Введіть пошту клієнта..."}/>
						<Input setOutsideState={setClientAddress} placeholder={"Введіть адресу клієнта..."}/>
						<View style={{flexDirection: 'row', justifyContent: 'flex-end' }}>
							{
								loadingIndicator.action === 'addOrder' ? <ActivityIndicator size={'small'} color={theme.colors.text} />
								: <Button 
								title={{
									text: 'Додати'
								}}
								onPress={() => {
									if (orderModel === "" || clientName==="" || clientPhone==="") {
										Alert.alert("Обов'язкові поля: Модель пристрю, Ім'я клієнта, Телефон клієнта.")
									} else {
										const newOrder = {
											model: orderModel,
											client: {
												name: clientName,
												phone: clientPhone,
												email: clientEmail,
												address: clientAddress,
											},
											date: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
											status: 'running'
										}
										addOrderToFirestore(user.id, newOrder);	
									}								
								}}
								buttonStyle={{margin: 10}}
							/>
							}
							<Button 
								title={{
									text: 'Закрити'
								}}
								onPress={() => setModalVisible(false)}
								buttonStyle={{backgroundColor: '#c80037', marginHorizontal: 10}}
							/>
						</View>
					</View>
				</View>
			</Modal>
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

const styles = StyleSheet.create({
	centeredView: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	modalView: {
	  margin: 20,
	  backgroundColor: 'white',
	  borderRadius: 20,
	  padding: 20,
	  alignItems: 'center',
	  shadowColor: '#000',
	  shadowOffset: {
		width: 0,
		height: 2,
	  },
	  shadowOpacity: 0.25,
	  shadowRadius: 4,
	  elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
  });