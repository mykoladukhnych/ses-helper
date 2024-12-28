import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: {}
}

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServicesLaoding: (state, action) => {
            state.loading = action.payload;
        },
        setServicesData: (state, action) => {
            for (let key in action.payload) {
                state.data[key] = action.payload[key];                
            }            
        }
    }
});

export const {setServicesLaoding, setServicesData} = servicesSlice.actions;
export default servicesSlice.reducer;