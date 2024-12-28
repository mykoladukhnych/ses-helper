import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';
import informationReducer from './slices/informationSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        services: servicesReducer,
        information: informationReducer,
        theme: themeReducer
    },
    middleware: getDefaultMiddlware => getDefaultMiddlware()
});
export default store;