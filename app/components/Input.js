import { StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MyDarkTheme, MyLightTheme } from '../theme/theme';

const Input = ({type='text', keyboardType, setOutsideState, placeholder}) => {
    const [value, setValue] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const theme = useColorScheme();

    const icon = type === 'text' ? 
        value !== '' ? <MaterialCommunityIcons name="backspace" size={20} color={theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text} /> : null
        : type === 'password' ? <MaterialCommunityIcons name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#000" />
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
            backgroundColor: theme === 'dark' ? MyDarkTheme.colors.input : MyLightTheme.colors.background,
            borderColor: theme === 'dark' ? MyDarkTheme.colors.border : MyLightTheme.colors.border,
        }}>
            <TextInput
                style={{
                    ...styles.input,
                    backgroundColor: theme === 'dark' ? MyDarkTheme.colors.input : MyLightTheme.colors.background,
                    color: theme === 'dark' ? MyDarkTheme.colors.text : MyLightTheme.colors.text,
                }}
                placeholder={placeholder}
                placeholderTextColor={theme === 'dark' ? MyDarkTheme.colors.placeholder : MyLightTheme.colors.placeholder}
                secureTextEntry={type === 'text' ? false : !isPasswordVisible}
                value={value}
                keyboardType={keyboardType}
                onChangeText={text => {
                    setValue(text);
                    setOutsideState && setOutsideState(text);
                }}
            />
            <TouchableOpacity 
                style={styles.icon} 
                onPress={type === 'text' ? clearField : togglePasswordVisibility}
            >
                    {icon}
            </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        fontWeight: '700'
    },
    icon: {
        padding: 10,
    },
  });

  export default Input;
  