import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    address: '',
    status: false,
    apiKey :'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk',
};

export const addAddress = createAsyncThunk(
    'address/setAddress',
    async (address) => {
        return address;
    }
);

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addAddress.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            console.log("action.payload"+action.payload);
            state.address = action.payload;
        });
    }
});

export const { } = addressSlice.actions;

export default addressSlice.reducer;
