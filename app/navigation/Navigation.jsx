import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginLayout from './layouts/LoginLayout';
import MainLayout from './layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme } from '../theme/theme';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { setLoading, setUser } from '../store/slices/authSlice';


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