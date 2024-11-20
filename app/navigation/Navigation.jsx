import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginLayout from './layouts/LoginLayout';
import MainLayout from './layouts/MainLayout';
import { useSelector } from 'react-redux';
import { StatusBar, useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme } from '../theme/theme';

const Navigation = () => {
    const user = useSelector(state => state.auth.user);

    return (
        <NavigationContainer theme={useColorScheme() === 'dark' ? MyDarkTheme : MyLightTheme}>
            {
                user ? <MainLayout /> : <LoginLayout />
            }
            <StatusBar 
                barStyle={
                    useColorScheme() === 'dark' ? 'light-content' : 'dark-content'} 
                    backgroundColor={useColorScheme() === 'dark' ? MyDarkTheme.colors.card : MyLightTheme.colors.card}
                />
        </NavigationContainer>
    )
}

export default Navigation