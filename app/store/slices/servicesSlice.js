import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: {
        warranty: {},
        easypro: {}
    }
}

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setLaoding: (state, action) => {
            state.loading = action.payload;
        },
        setServices: (state, action) => {
            state.data.warranty = action.payload.warranty;
            state.data.easypro = action.payload.easypro;
        }
    }
});

export const {setLoading, setServices} = servicesSlice.actions;
export default servicesSlice.reducer;