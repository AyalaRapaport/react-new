import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// let apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

const initialState = {
    stores: [],
    productLists: [],
    status: false
};

export const getStores = createAsyncThunk(
    'getStores',
    async () => {
        try {
            const response = await axios.get('https://localhost:7229/api/Store');
            let stores = response.data;
            if (response.status === 200) {
                for (let index = 0; index < stores.length; index++) {
                    const img = await axios.get(`https://localhost:7229/api/Store/getImage/${stores[index].urlImage}`)
                    stores[index] = { ...stores[index], imgFile: img.data }
                    for (let i = 0; i < stores[index].productList.length; i++) {
                        const imgP = await axios.get(`https://localhost:7229/api/Product/getImage/${stores[index].productList[i].urlImage}`)
                        stores[index].productList[i] = { ...stores[index].productList[i], imgFile: imgP.data }
                    }
                }

                return response.data;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getStores.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.stores = action.payload;
            for (let i = 0; i <state.stores.length; i++) {
                state.productLists[action.payload[i].id] = action.payload[i].productList;

            }
        });
    }
});

export const { } = storeSlice.actions;

export default storeSlice.reducer;
