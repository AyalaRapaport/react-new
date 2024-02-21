import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const initialState = {
    products: [],
    images: [],
    status: 'init',
    imgStatus: 'init',
    product: ''
}

export const getProduct = createAsyncThunk(
    'getProduct',
    async () => {
        try {
            const response = await axios.get('https://localhost:7229/api/Product');
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const getProductById = createAsyncThunk(
    'getProductById',
    async (Id) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/Product/${Id}`);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const getImage = createAsyncThunk(
    'getImage',
    async (product) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/Product/getImage/${product.urlImage.toString()}`)
            // console.log(response.data);
            const image = {img: response.data,id:product.id };
            return image;

        } catch (error) {
            console.log(error);
        }
    }
)
export const addProduct = createAsyncThunk(
    'addProduct',
    async (product) => {
        try {
            const response = await axios.post(`https://localhost:7229/api/Product}`,
                {
                    Name: product.Name,
                    Price: product.Price,
                    Description: product.Description,
                    CategoryId: product.CategoryId,
                    StoreId: product.StoreId,
                    Image: product.Image,
                    UrlImage: product.UrlImage
                })
            // console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)
export const updateProduct = createAsyncThunk(
    'updateProduct',
    async (product) => {
        console.log(product);
        console.log( (product.Image));
        try {
            const response = await axios.put(`https://localhost:7229/api/Product/${product.Id}`, {
                Name: product.name,
                Price: product.price,
                Description: product.description,
                CategoryId: product.categoryId,
                StoreId: product.storeId,
                Image: product.image,
                UrlImage: product.urlImage
            })
            // console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.products = action.payload
        })
        builder.addCase(getImage.fulfilled, (state, action) => {
            state.imgStatus = 'fulfilled'
            state.images.push(action.payload);
        })
        builder.addCase(getProductById.fulfilled, (state, action) => {
            state.product = action.payload;
        })

    },
}
)
export const { } = productSlice.actions

export default productSlice.reducer