import { View, StyleSheet, Modal, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from './Input';
import { useSelector } from 'react-redux';
import Button from './Button';
import { useOrders } from '../hooks/useOrders';

const AddOrderModal = ({ visible, onClose }) => {

    const [orderModel, setOrderModel] = useState('');
	const [clientName, setClientName] = useState('');
	const [clientPhone, setClientPhone] = useState('');
	const [clientEmail, setClientEmail] = useState('');
	const [clientAddress, setClientAddress] = useState('');
	
	const { addNewOrder } = useOrders();

    const [loading, setLoading] =useState(false);
	const { theme } = useSelector(state => state.theme);

    const inputs = [
        { setState: setOrderModel, placeholder: "Введіть модель пристрою...", require: true },
        { setState: setClientName, placeholder: "Введіть ім'я клієнта...", require: true },
        { setState: setClientPhone, placeholder: "Введіть телефон клієнта...", require: true },
        { setState: setClientName, placeholder: "Введіть email клієнта...", require: false },
        { setState: setClientName, placeholder: "Введіть адресу клієнта...", require: false },
    ];

    useEffect(() => {
        if (!visible) {
            setOrderModel('');
            setClientName('');
            setClientPhone('');
            setClientEmail('');
            setClientAddress('');
        }
    }, [visible]);

    const addOrderHandler = async () => {
		setLoading(true);
        try {
            if (!orderModel || !clientName || !clientPhone) {
                Alert.alert("Заповніть обов'язкові поля!");
                return;
            }
    
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
            await addNewOrder(newOrder);
			onClose();
        } catch(error) {
            Alert.alert(error);
        } finally { setLoading(false) }
    }

    return (
        <Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={onClose}
			>
				<View style={{...styles.centeredView, backgroundColor: theme.colors.background}}>
					<View style={{...styles.modalView, backgroundColor: theme.colors.card}}>

                        {
                            inputs.map((item, i) => {
                                return(
                                    <Input 
                                        setOutsideState={item.setState} 
                                        placeholder={item.placeholder} 
                                        require={item.require}
										key={i}
                                    />
                                )
                            })
                        }

						<View style={{flexDirection: 'row', justifyContent: 'flex-end' }}>
							{
								loading ? <ActivityIndicator size={'small'} color={theme.colors.text} />
								: <Button 
								title={{
									text: 'Додати'
								}}
								onPress={addOrderHandler}
								buttonStyle={{margin: 10}}
							/>
							}
							<Button 
								title={{
									text: 'Закрити'
								}}
								onPress={() => onClose()}
								buttonStyle={{backgroundColor: '#c80037', marginHorizontal: 10}}
							/>
						</View>
					</View>
				</View>
			</Modal>
    )
}

export default AddOrderModal;

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