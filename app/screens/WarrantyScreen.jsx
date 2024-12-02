import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';

import Accordion from '../components/Accordion';
import Input from '../components/Input';
import { useSelector } from 'react-redux';

const WarrantyScreen = () => {
    const data = useSelector(state => state.services.data.warranty);
    const { theme } = useSelector(state => state.theme);
    const [devicePrice, setDevicePrice] = useState(0);
    const [renderItems, setRenderItems] = useState([]);
	const [loading, setLoading] = useState(true);

    useEffect(() => {		
		const processData = async () => {
            setLoading(true);            
            const result = data.list.map((item , i) => <Accordion 
                                                                    header={{
                                                                        left: <Text style={{...styles.titleText, color: theme.colors.text}}>{item.title}</Text>,  
                                                                        right: <Text style={{...styles.titleText, color: theme.colors.text}}>{(item.price * devicePrice).toFixed(2)}</Text>
                                                                    }} 
                                                                    content={{
                                                                        corners: {
                                                                            topRight: (item.price * 100).toFixed(0) + '%'
                                                                        },
                                                                        data: item.descr.map((el, i) => <Text style={{...styles.contentText, color: theme.colors.text}} key={i}>{el}</Text>)
                                                                    }} key={i}/>);
            
            setRenderItems(result);
            setLoading(false);
		};

		processData();
	}, [data, devicePrice]);

    return (
        <View>
            <Input placeholder={'Введіть вартість пристрою...'} keyboardType='numeric' setOutsideState={setDevicePrice}/>
            <ScrollView>
                {
                    loading ? <ActivityIndicator size={'large'} color={theme.colors.text} /> : renderItems
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 14,
        fontWeight: '700'
    },
    contentText: {
        fontSize: 12,
        fontWeight: '500',
		marginTop: 15,
    },
})

export default WarrantyScreen