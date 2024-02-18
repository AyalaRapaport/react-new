import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    products: [{}],
    images:[],
    status: 'init',
    imgStatus: 'init'
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
            return(error.message);
        }
    }
);
export const getImage = createAsyncThunk(
    'getImage',
    async (urlImage) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/Product/getImage/${urlImage.toString()}`)
            // console.log(response.data);
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)

// export const setDetails = createAsyncThunk(
//     'setDetails',
//     async (courier, thunkAPI) => {
//         try {
//             const response = await axios.put(`https://localhost:7229/api/Courier/${courier.IdCourier}`, {
//                 IdCourier: courier.IdCourier,
//             });
//             if (response.status === 200) {
//                 return response.data;
//             }
//         } catch (error) {
//             return (error.message);
//         }
//     }
// );

// export const addCourier = createAsyncThunk(
//     'couriers/addCourier',
//     async (courier) => {
//         try {
//             const response = await axios.post('https://localhost:7229/api/Courier', {
//                 idCourier: courier.IdCourier,
//                 lastShipment: courier.Date

//             });
//             if (response.status === 200) {
//                 return response.data;
//             } 
//         }
//         catch (error) {
//             return (error.message);
//         }
//     });

export const productSlice = createSlice({
    name: 'courier',
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
// extraReducers: (builder) => {
//     builder.addCase(getProduct.fulfilled, (state, action) => {
//         state.status = 'fulfilled'
//         state.products = action.payload.map(product => ({
//             ...product,
//             imageUrl: null // נוסיף מאפיין זה למוצרים
//         }));
//     })
//     builder.addCase(getImage.fulfilled, (state, action) => {
//         state.imgStatus = 'fulfilled';
//         const { productId, imageUrl } = action.payload;
//         const productIndex = state.products.findIndex(product => product.id === productId);
//         if (productIndex !== -1) {
//             state.products[productIndex].imageUrl = imageUrl;
//         }
//     })
// },
// });
export const { } = productSlice.actions

export default productSlice.reducer