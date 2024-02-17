import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";

let apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

const initialState = {
    address: '',
    status: false
};

export const addAddress = createAsyncThunk(
    'address/setAddress',
    async (address, thunkAPI) => {
        return address;
    }
);

// export const getCoordinate=createAsyncThunk(
//     'getCoordinate',
//     async (address,thunkAPI)=>{
//         try {
//             const response = await axios.get(
//                 `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
//             );
//             const { lat, lng } = response.data.results[0].geometry.location;
//             // setLatitude(lat);
//             // setLongitude(lng);
//             console.log("address" + lat, lng);
            
//         } catch (error) {
//             console.error("Error getting coordinates:", error);
//         }
//     }
// )

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
