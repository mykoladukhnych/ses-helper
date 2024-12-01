import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from 'react-native';

const currentScheme = Appearance.getColorScheme();

const initialState = {
    currentTheme: Appearance.getColorScheme(),
    theme: currentScheme === 'dark' ?
        {
            ...DarkTheme,
            colors: {
                ...DarkTheme.colors,
                background: '#010a0f',
                text: '#ffffff',
                card: '#00141d',
                input:  '#00202e',
                cardChild: '#001e28',
                placeholder: '#ccc'
            }
        } : {
            ...DefaultTheme,
            colors: {
                ...DefaultTheme.colors,
                text: '#000000',
                border: '#eee'
            }
        }
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            if (action.payload === 'dark') {
                state.currentTheme = 'dark';
                state.theme = {
                    ...DarkTheme,
                    colors: {
                        ...DarkTheme.colors,
                        background: '#010a0f',
                        text: '#ffffff',
                        card: '#00141d',
                        input:  '#00202e',
                        cardChild: '#001e28',
                        placeholder: '#ccc'
                    }
                }
            } else {
                state.currentTheme = 'light';
                state.theme = {
                    ...DefaultTheme,
                    colors: {
                        ...DefaultTheme.colors,
                        text: '#000000'
                    }
                }
            }
                
        }
    }
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;