import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    address: '',
    statusAddress: false,
    apiKey: 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk',
    currentAddress: null,
    currentXCoordinate:0,
    currentYCoordinate:0,
};

// export const addAddress = createAsyncThunk(
//     'address/setAddress',
//     async (address) => {
//         return address;
//     }
// );

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddress: (state, action) => {
            state.address = action.payload;
            state.statusAddress='fulfilled';
        },
        addcurrentAddress: (state, action) => {
            state.currentAddress = action.payload;
        },
        currentXCoordinate: (state, action) => {
            state.currentAddress = action.payload;
        },
        currentYCoordinate: (state, action) => {
            state.currentAddress = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(addAddress.fulfilled, (state, action) => {
    //         state.status = 'fulfilled';
    //         console.log("action.payload" + action.payload);
    //         state.address = action.payload;
    //     });
    // }
});

export const {addcurrentAddress,currentXCoordinate,currentYCoordinate,addAddress } = addressSlice.actions;

export default addressSlice.reducer;
