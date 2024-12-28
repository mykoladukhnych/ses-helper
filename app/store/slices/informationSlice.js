import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    data: {}
};

const informationSlice = createSlice({
    name: 'information',
    initialState,
    reducers: {
        setInfoLaoding: (state, action) => {
            state.loading = action.payload;
        },
        setInfoData: (state, action) => {
            for (let key in action.payload) {
                state.data[key] = action.payload[key];                
            }            
        }
    }
});

export const { setInfoData, setInfoLaoding } = informationSlice.actions;
export default informationSlice.reducer;