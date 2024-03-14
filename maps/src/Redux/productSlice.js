import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    products: [],
    images: [],
    status: 'init',
    imgStatus: 'init',
}

export const getProduct = createAsyncThunk(
    'getProduct',
    async () => {
        try {
            const response = await axios.get('https://localhost:7229/api/Product');
            let products = response.data;
            if (response.status === 200) {
                for (let index = 0; index < products.length; index++) {
                    const img = await axios.get(`https://localhost:7229/api/Product/getImage/${products[index].urlImage}`)
                    products[index] = { ...products[index], imgFile: img.data }
                }
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
            const image = { img: response.data, id: product.id };
            return image;

        } catch (error) {
            console.log(error);
        }
    }
)

export const deletePro = createAsyncThunk(
    'deleteProduct',
    async (id) => {
        try {
            const response = await axios.delete(`https://localhost:7229/api/Product/${id}`);
            console.log(response);
            return id;
        } catch (error) {
            return error.message;
        }
    }
)

export const addProduct = createAsyncThunk(
    'addProduct',
    async (product) => {
        try {
            const formData = new FormData();
            formData.append('Name', product.Name);
            formData.append('Price', product.Price);
            formData.append('Description', product.Description);
            formData.append('CategoryId', product.CategoryId);
            formData.append('StoreId', product.StoreId.storeId);
            formData.append('Image', product.Image);

            let response = await axios.post(`https://localhost:7229/api/Product`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const img = await axios.get(`https://localhost:7229/api/Product/getImage/${product.Image.name}`)
            response.data={...response.data,imgFile: img.data}
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);


export const updateProduct = createAsyncThunk(
    'updateProduct',
    async (product) => {
        try {
            const formData = new FormData();
            formData.append('Name', product.Name);
            formData.append('Price', product.Price);
            formData.append('Description', product.Description);
            formData.append('CategoryId', product.CategoryId);
            formData.append('StoreId', product.StoreId);
            formData.append('Image', product.Image);
            const response = await axios.put(`https://localhost:7229/api/Product/${product.Id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const img = await axios.get(`https://localhost:7229/api/Product/getImage/${product.Image.name}`)
            response.data={...response.data,imgFile: img.data,id: product.Id}
            return response.data;
            // response.data = { ...response.data, id: product.Id }
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

    },
}
)
export const { } = productSlice.actions

export default productSlice.reducer