import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MyLightTheme, MyDarkTheme } from '../theme/theme';

const Card = ({data, screenName, parentRoute, navigation}) => {

	const theme = useColorScheme();

	return (
		<TouchableOpacity 
			style={{
				...styles.container,
				backgroundColor: theme === 'dark' ? MyDarkTheme.colors.card : MyLightTheme.colors.card,
				borderColor: theme === 'dark' ? MyDarkTheme.colors.border : MyLightTheme.colors.border,
			}} 
			onPress={
				() => navigation.navigate(screenName, { data, parentRoute })
			}>
			<Text style={{
				...styles.text,
				color: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text,
			}}>{data.title || data.model}</Text>
			<MaterialCommunityIcons name="chevron-right" size={24} color="#CCCCCC" />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	text: {
		fontSize: 16,
        fontWeight: '700'
	}
});

export default Card;