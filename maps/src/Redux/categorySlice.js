import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import Categories from '../Componets/Categories';

const initialState = {
    categories: [{}],
    imagesC: [],
    status: 'init',
    imgStatus: 'init',
    storesByCat: []
}

export const getCategory = createAsyncThunk(
    'getCategory',
    async () => {
        try {
            const response = await axios.get('https://localhost:7229/api/Category');
            let categories = response.data;
            if (response.status === 200) {
                for (let index = 0; index < categories.length; index++) {
                    const img = await axios.get(`https://localhost:7229/api/Category/getImage/${categories[index].urlImage}`)
                    categories[index] = { ...categories[index], imgFile: img.data }
                }
                // console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const getStoresByCat = createAsyncThunk(
    'getStoresByCat',
    async () => {
        try {
            const productsResponse = await axios.get('https://localhost:7229/api/Product');
            const products = productsResponse.data;
            console.log(products);
            const categoryResponse = await axios.get('https://localhost:7229/api/Category');
            // const categories = thunkAPI.getState().category.categories;
            const categories = categoryResponse.data;
            console.log(categories);
            const storesByCategory = {};

            categories.forEach(category => {
                storesByCategory[category.id] = [];
            });

            products.forEach(product => {
                const categoryId = product.categoryId;
                const storeId = product.storeId;
                if (storesByCategory[categoryId]) {
                    let isexist = false;
                    for (let i = 0; i < storesByCategory[categoryId].length; i++) {
                        if (storesByCategory[categoryId][i]===storeId)  
                        isexist=true;                      
                    }
                    if(!isexist)
                    storesByCategory[categoryId].push(storeId);
                }
            });

            return storesByCategory;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
);

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                state.categories = action.payload
            })
            .addCase(getStoresByCat.fulfilled, (state, action) => {
                state.storesByCat = action.payload;
                console.log(state.storesByCat);
            })
            .addCase(getStoresByCat.rejected, (state, action) => {
                state.storesByCat = [];
            });
    },
});

export default categorySlice.reducer;
