import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: {}
}

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setLaoding: (state, action) => {
            state.loading = action.payload;
        },
        setServices: (state, action) => {
            for (let key in action.payload) {
                state.data[key] = action.payload[key];                
            }            
        }
    }
});

export const {setLoading, setServices} = servicesSlice.actions;
export default servicesSlice.reducer;