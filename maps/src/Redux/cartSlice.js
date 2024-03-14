import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    inCart: [],
    status: false
};

// export const addProduct = createAsyncThunk(
//     'addProduct',
//     async (product) => {
//         return product;
//     }
// );

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeProducts: (state) => {
            state.inCart = [];
        },
        deleteProduct: (state, action) => {
            const indexToDelete = state.inCart.findIndex(product => product.id === action.payload);
            if (indexToDelete !== -1) {
                state.inCart.splice(indexToDelete, 1);
            }
        },
        addProductToCart: (state, action) => {
            state.inCart = [...state.inCart, action.payload];
        }

    },
    extraReducers: (builder) => {
        // builder.addCase(addProduct.fulfilled, (state, action) => {
        //     state.status = 'fulfilled';
        //     console.log("action.payload" + action.payload);
        //     state.inCart = [...state.inCart, action.payload];
        // });
    }
});

export const { removeProducts, deleteProduct, addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
