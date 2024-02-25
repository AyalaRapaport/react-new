import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    inCart: [],
    status: false
};

export const addProduct = createAsyncThunk(
    'addProduct',
    async (product) => {
        return product;
    }
);

// export const removeProducts = createAsyncThunk(
//     'removeProduct',
//     async () => { 
//         return true;
//     }
// );

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        removeProducts:(state,action)=>{
            state.inCart = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            console.log("action.payload" + action.payload);
            state.inCart = [...state.inCart, action.payload];
        });
        // builder.addCase(removeProducts.fulfilled, (state, action) => {
        //     debugger
        //     state.status = 'fulfilled';
        //     state.inCart = [];
        //     console.log(state.inCart);
        // });
    }
});

export const { removeProducts} = cartSlice.actions;

export default cartSlice.reducer;
