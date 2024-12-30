import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import Input from '../components/Input';
import Accordion from '../components/Accordion';
import { useSelector } from 'react-redux';

const EasyproScreen = () => {
	const data = useSelector(state => state.services.easypro);
	const { theme } = useSelector(state => state.theme);
	const [model, setModel] = useState('');
	const [renderItems, setRenderItems] = useState([]);
	const [loading, setLoading] = useState(true);	

	useEffect(() => {		
		const processData = async () => {
		setLoading(true);

		const result = await data.pricelist.filter(item => item.model.toLowerCase().startsWith(model.toLowerCase())).map((item, i) => {
			return (
				<Accordion 
					header={{
						left: <Text style={{ ...styles.acordionTitle, color: theme.colors.text}}>{item.model}</Text>
					}} 	
					content={{
						corners: {},
						data: Object.keys(item).sort().map((key, i) => {
							if (key !== 'model' && item[key]) {
								return (
									<Accordion 
										header={{
											left: <Text style={{...styles.acordionTitle, color: theme.colors.text,}}>{data.description[key].title}</Text>, 
											right: <Text style={{...styles.acordionTitle, color: theme.colors.text,}}>{item[key].toFixed(2)}</Text>
										}}
										content={{
											corners: {},
											data: data.description[key].descr.map((el, i) => <Text style={{...styles.accordionText, color: theme.colors.text,}} key={i}>{el}</Text>)
										}}
										key={i}/>
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
		<View style={styles.container}>
			<Input
				placeholder={'Введіть модель...'}	
				setOutsideState={setModel}	
				style={{
					container: {
						paddingVertical: 10
					}
				}}	
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

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	acordionTitle: {
		fontSize: 14, 
		fontWeight: 700,
	},
	accordionText: {
		fontSize: 12, 
		fontWeight: 400, 
		marginVertical: 5, 
	}
})