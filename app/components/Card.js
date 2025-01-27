import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const Card = ({data={left: null, right: null, payload: null}, onPress=null}) => {
	const { theme } = useSelector(state => state.theme);

	return (
		onPress ? 
				<TouchableOpacity 
					style={{
						...styles.container,
						backgroundColor: theme.colors.card,
						borderColor: theme.colors.border,
					}} 
					onPress={onPress}>
						{ data.left || null }
						{ data.right || null }
				</TouchableOpacity>
			: <View 
				style={{
					...styles.container,
					backgroundColor: theme.colors.card,
					borderColor: theme.colors.border,
				}} >
					{ data.left || null }
					{ data.right || null }
			</View>
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
	}
});

export default Card;