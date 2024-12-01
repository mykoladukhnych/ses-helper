import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginLayout from './layouts/LoginLayout';
import MainLayout from './layouts/MainLayout';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

const Navigation = () => {
    const user = useSelector(state => state.auth.user);
    const {currentTheme, theme} = useSelector(state => state.theme);
    
    return (
        <NavigationContainer theme={theme}>
            {
                user ? <MainLayout /> : <LoginLayout />
            }
            <StatusBar 
                barStyle={
                    currentTheme === 'dark' ? 'light-content' : 'dark-content'} 
                    backgroundColor={theme.colors.background}
                />
        </NavigationContainer>
    )
}

export default Navigation