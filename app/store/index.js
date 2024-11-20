import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        services: servicesReducer
    },
    middleware: getDefaultMiddlware => getDefaultMiddlware()
});
export default store;