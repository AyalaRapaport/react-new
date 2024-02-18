import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    categories: [{}],
    imagesC: [],
    status: 'init',
    imgStatus:'init'
}

export const getCategory = createAsyncThunk(
    'getCategory',
    async () => {
        try {
            const response = await axios.get('https://localhost:7229/api/Category');
            if (response.status === 200) {
                // console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const getImageC = createAsyncThunk(
    'getImage',
    async (urlImage) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/Category/getImage/${urlImage.toString()}`)
            // console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)




export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.categories = action.payload
        })
        builder.addCase(getImageC.fulfilled, (state, action) => {
            state.imgStatus = 'fulfilled'
            state.imagesC.push(action.payload);
            // console.log("imagge" + state.images);

        })

    },
}
)
export const { } = categorySlice.actions

export default categorySlice.reducer