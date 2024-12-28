import { createSlice } from "@reduxjs/toolkit";

const informationSlice = createSlice({
    name: 'information',
    initialState: {},
    reducers: {
        setInformationData: (state, action) => {
            for (let key in action.payload) {
                state[key] = action.payload[key];                
            }            
        }
    }
});

export const { setInformationData } = informationSlice.actions;
export default informationSlice.reducer;