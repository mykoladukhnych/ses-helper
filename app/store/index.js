import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: getDefaultMiddlware => getDefaultMiddlware()
});
export default store;