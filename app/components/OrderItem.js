import { View, Text, Pressable, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import Accordion from './Accordion';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from './Button';
import { useOrders } from '../hooks/useOrders';

const OrderItem = ({ item, index }) => {
    const [loadingIndicatior, setLoadingIndicator] = useState({
        show: false,
        action: ''
    });

    const { theme } = useSelector(state => state.theme);
    const { updateOrderStatus, deleteOrderByIndex } = useOrders();

    const updateOrderStatusHandler = async () => {
        setLoadingIndicator({
            show: 'true',
            action: "updateOrderStatus"
        });
        const newStatus = item.status === "running" ? "done" : "running";
        await updateOrderStatus(index, newStatus);
        setLoadingIndicator({
            show: false,
            action: ''
        });
    }

    const deleteOrderHandler = async () => {
        setLoadingIndicator({
            show: 'true',
            action: "deleteOrder"
        });
        await deleteOrderByIndex(index);
        setLoadingIndicator({
            show: false,
            action: ''
        });
    }

    const accordionData = () => {
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
                        loadingIndicatior.show && loadingIndicatior.action === "updateOrderStatus" ? <ActivityIndicator size={'small'} color={theme.colors.text} style={{margin: 21}} />
                        : <Button
                                title={{
                                    text: item.status === 'running' ? "Виконано" : "В роботу"
                                }}
                                onPress={updateOrderStatusHandler}
                            />
                    }
                </View>
            </View>
        )
    }

  return (
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
                                    onPress: () => {deleteOrderHandler()},
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
                    { loadingIndicatior.show && loadingIndicatior.action === "deleteOrder" ? <ActivityIndicator size={24} color={theme.colors.text} /> : <MaterialCommunityIcons name="trash-can-outline" size={24} color="white" /> }
                </Pressable>
        }} 	
        content={{
            corners: {},
            data: accordionData()
        }}
        style={{
            titleContainer: { backgroundColor: item.status === 'done' ? 'green' : theme.colors.card },
            content: {padding: 0, paddingHorizontal: 15, paddingTop: 10}
        }}
    />
  )
}

export default OrderItem