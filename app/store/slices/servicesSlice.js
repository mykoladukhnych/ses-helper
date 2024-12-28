import { createSlice } from "@reduxjs/toolkit";


const servicesSlice = createSlice({
    name: 'services',
    initialState: {},
    reducers: {
        setServicesData: (state, action) => {
            for (let key in action.payload) {
                state[key] = action.payload[key];                
            }            
        }
    }
});

export const {setServicesLaoding, setServicesData} = servicesSlice.actions;
export default servicesSlice.reducer;