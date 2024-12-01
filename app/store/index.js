import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        services: servicesReducer,
        theme: themeReducer
    },
    middleware: getDefaultMiddlware => getDefaultMiddlware()
});
export default store;