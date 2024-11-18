import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { darkThemeColors, lightThemeColors } from "./colors";

export const MyLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...lightThemeColors
    }
}

export const MyDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        ...darkThemeColors
    }
}