import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'https://localhost:7229/api';

const initialState = {
    categories: [{}],
    imagesC: [],
    status: 'init',
    imgStatus: 'init',
    storesByCat: []
}
export const addCategory = createAsyncThunk(
    'addCategory',
    async (category) => {
        try {
            const formData = new FormData();
            formData.append('Name', category.Name);
            formData.append('Image', category.Image);

            const response = await axios.post(`${url}/Category`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // const img = await axios.get(`https://localhost:7229/api/Product/getImage/${category.Image.name}`)
            // response.data = { ...response.data, imgFile: img.data }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);


export const updateCategory = createAsyncThunk(
    'updateCategory',
    async (category) => {
        try {
            const formData = new FormData();
            formData.append('Name', category.Name);
            formData.append('Image', category.Image);

            const response = await axios.put(`${url}/category/${category.Id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const img = await axios.get(`https://localhost:7229/api/Product/getImage/${category.Image.name}`)
            response.data = { ...response.data, imgFile: img.data }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)
export const getCategory = createAsyncThunk(
    'getCategory',
    async () => {
        try {
            const response = await axios.get('https://localhost:7229/api/Category');
            if (response.status === 200) {
                // for (let index = 0; index < categories.length; index++) {
                //     const img = await axios.get(`https://localhost:7229/api/Category/getImage/${categories[index].urlImage}`)
                //     categories[index] = { ...categories[index], imgFile: img.data }
                // }
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
            const categoryResponse = await axios.get('https://localhost:7229/api/Category');
            const categories = categoryResponse.data;
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
                        if (storesByCategory[categoryId][i] === storeId)
                            isexist = true;
                    }
                    if (!isexist)
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

        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.categories = action.payload
        })
        builder.addCase(getStoresByCat.fulfilled, (state, action) => {
            state.storesByCat = action.payload;
        })
        builder.addCase(getStoresByCat.rejected, (state, action) => {
            state.storesByCat = [];
        });

        builder.addCase(addCategory.fulfilled, (state, action) => {
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        });

    },
});

export default categorySlice.reducer;
