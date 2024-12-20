import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Input = ({type='text', keyboardType, setOutsideState, placeholder, style={container: {}, input: {}}}) => {
    const [value, setValue] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { currentTheme, theme } = useSelector(state => state.theme);

    const icon = type === 'text' ? 
        value !== '' ? <MaterialCommunityIcons name="backspace" size={20} color={theme.colors.text} /> : null
        : type === 'password' ? <MaterialCommunityIcons name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color={currentTheme === 'dark' ? 'white' : 'black'} />
        : null;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const clearField = () => {
        setValue('');
        setOutsideState && setOutsideState('');
    }
    
    return (
        <View style={{
            ...styles.container,
            backgroundColor: currentTheme === 'dark' ? theme.colors.input : theme.colors.background,
            borderColor: theme.colors.border,
            ...style.container
        }}>
            <TextInput
                style={{
                    ...styles.input,
                    backgroundColor: currentTheme === 'dark' ? theme.colors.input : theme.colors.background,
                    color: theme.colors.text,
                    ...style.input
                }}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.placeholder}
                secureTextEntry={type === 'text' ? false : !isPasswordVisible}
                value={value}
                keyboardType={keyboardType}
                onChangeText={text => {
                    setValue(text);
                    setOutsideState && setOutsideState(text);
                }}
            />
            <TouchableOpacity 
                onPress={type === 'text' ? clearField : togglePasswordVisibility}
            >
                    {icon}
            </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        padding: 5,
        fontSize: 16,
        fontWeight: '700',
        autoCapitalize: 'none'
    },
  });

  export default Input;
  