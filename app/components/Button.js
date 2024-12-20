import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({
    title={
        text: '',
        style: {}
    }, 
    buttonStyle={},
    onPress = () => {alert('Pressed')}
}) => {
    return (
        <Pressable
            style={{...styles.button, ...buttonStyle}}
            onPress={onPress}>
            <Text style={{...styles.textStyle, ...title.style}}>{title.text}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
		marginVertical: 10,
		borderRadius: 5,
		padding: 10,
		elevation: 2,
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16,
	}
})