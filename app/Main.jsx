import React from 'react'
import Navigation from './navigation/Navigation'
import { Appearance } from 'react-native';
import { useDispatch } from 'react-redux';
import { setTheme } from './store/slices/themeSlice';

const Main = () => {
    const dispatch = useDispatch();
    Appearance.addChangeListener(({ colorScheme }) => {
        dispatch(setTheme(colorScheme))
    });
    return (
        <Navigation />
    )
}

export default Main