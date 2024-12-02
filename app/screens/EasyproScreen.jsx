import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, updateDoc, arrayUnion  } from "firebase/firestore";
import {FIREBASE_DB} from '../../firebaseConfig';

import Input from '../components/Input';
import Card from '../components/Card';
import Accordion from '../components/Accordion';
import { useSelector } from 'react-redux';

const EasyproScreen = () => {
	const data = useSelector(state => state.services.data.easypro);
	const { theme } = useSelector(state => state.theme);
	const [model, setModel] = useState('');
	const [renderItems, setRenderItems] = useState([]);
	const [loading, setLoading] = useState(true);	

	useEffect(() => {		
		const processData = async () => {
		setLoading(true);

		const result = await data.pricelist.filter(item => item.model.startsWith(model)).map((item, i) => {
			return (
				<Accordion 
					header={{
						left: <Text style={{fontSize: 14, fontWeight: 700, color: theme.colors.text}}>{item.model}</Text>
					}} 	
					content={{
						corners: {},
						data: Object.keys(item).sort().map((key, i) => {
							if (key !== 'model' && item[key]) {
								return (
									<Card data={{
											left: <Text style={{fontSize: 14, fontWeight: 700, color: theme.colors.text,}}>{data.description[key].title}</Text>, 
											right: <Text style={{fontSize: 14, fontWeight: 700, color: theme.colors.text,}}>{item[key]}</Text>
										}} 
										pressable={false}
										key={key}
									/>
								)
							} else {
								return null;
							}
														
						})
					}}
					key={i}
				/>
			)  
		});
		setRenderItems(result);
		setLoading(false);
		};

		processData();
	}, [data, model]);

	return (
		<View>
			<Input
				placeholder={'Введіть модель...'}	
				setOutsideState={setModel}			
			/>

			<ScrollView>
				{ 
					loading ? <ActivityIndicator size={'large'} color={theme.colors.text} /> : renderItems
				}
			</ScrollView>
		</View>
	)
}

export default EasyproScreen;