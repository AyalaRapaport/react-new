import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import produce from 'immer';
import { addProduct, deletePro, updateProduct } from "./productSlice";
const apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';
const url = 'https://localhost:7229/api';

const initialState = {
    stores: [],
    productLists: [],
    status: false,
    storesNearby: []
};
export const addstore = createAsyncThunk(
    'addstore',
    async (store) => {
        try {
            const formData = new FormData();
            formData.append('Name', store.Name);
            formData.append('XCoordinate', store.XCoordinate);
            formData.append('YCoordinate', store.YCoordinate);
            formData.append('Password', store.Password);
            formData.append('Image', store.Image);

            const response = await axios.post(`${url}/Store`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const img = await axios.get(`https://localhost:7229/api/Product/getImage/${store.Image.name}`)
            response.data = { ...response.data, imgFile: img.data }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getStores = createAsyncThunk(
    'getStores',
    async () => {
        try {
            const response = await axios.get('https://localhost:7229/api/Store');
            let stores = response.data;
            if (response.status === 200) {
                for (let index = 0; index < stores.length; index++) {
                    // const img = await axios.get(`https://localhost:7229/api/Store/getImage/${stores[index].urlImage}`)
                    // stores[index] = { ...stores[index], imgFile: img.data }
                    // for (let i = 0; i < stores[index].productList.length; i++) {
                    //     const imgP = await axios.get(`https://localhost:7229/api/Product/getImage/${stores[index].productList[i].urlImage}`)
                    //     stores[index].productList[i] = { ...stores[index].productList[i], imgFile: imgP.data }
                    // }
                }
                for (let j = 0; j < stores.length; j++) {
                    const latitude = stores[j].xCoordinate;
                    const longitude = stores[j].yCoordinate;
                    let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`;
                    await fetch(geocodingApiUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'OK') {
                                stores[j] = { ...stores[j], address: data.results[0].formatted_address }

                            } else {
                                console.error('Error fetching address');
                            }
                        })
                        .catch(error => console.error('Error fetching address:', error));
                }
                return stores;
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
        addStoreNearby: (state, action) => {
            const existingLocation = state.storesNearby.find((loc) => loc?.id === action.payload.id);
            if (!existingLocation) {
                state.storesNearby.push(action.payload)
            }
        },

        deleteProductFromStore: (state, action) => {
            debugger
            const { storeId, id } = action.payload;
            state.productLists[storeId] = state.productLists[storeId].filter(product => product.id !== id);
        },

        editProductInStore: async (state, action) => {
            return produce(state, draftState => {
                const products = draftState.productLists[action.payload.storeId]; // Get the array of products
                const index = products.findIndex((product) => product.id === action.payload.id);

                if (index !== -1) {
                    const updatedProduct = {
                        ...products[index],
                        name: action.payload.name,
                        price: action.payload.price,
                        description: action.payload.description,
                        categoryId: action.payload.categoryId,
                        storeId: action.payload.storeId,
                        image: action.payload.image,
                    };

                    products[index] = updatedProduct;
                    draftState.productLists[action.payload.storeId] = [...products];
                }
            });
        }
    },

    extraReducers: (builder) => {
        builder.addCase(addstore.fulfilled, (state, action) => {
            return {
                ...state,
                stores: [...state.stores, action.payload]
            };
        });

        builder.addCase(getStores.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.stores = action.payload;
            for (let i = 0; i < state.stores.length; i++) {
                state.productLists[action.payload[i].id] = action.payload[i].productList;
            }
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            const updatedList = [...state.productLists[action.payload.storeId], action.payload];
            return {
                ...state,
                productLists: {
                    ...state.productLists,
                    [action.payload.storeId]: updatedList
                }
            };
        });

        builder.addCase(deletePro.fulfilled, (state, action) => {
            const updatedProductLists = { ...state.productLists };

            Object.keys(updatedProductLists).forEach(storeId => {
                updatedProductLists[storeId] = updatedProductLists[storeId].filter(product => product.id !== action.payload);
            });

            return {
                ...state,
                productLists: updatedProductLists
            };
        });

        builder.addCase(updateProduct.fulfilled, (state, action) => {
            const updatedProductLists = { ...state.productLists };

            Object.keys(updatedProductLists).forEach(storeId => {
                updatedProductLists[storeId] = updatedProductLists[storeId].map(product => {
                    if (product.id === action.payload.id) {
                        return {
                            ...product,
                            ...action.payload
                        };
                    }
                    return product;
                });
            });

            return {
                ...state,
                productLists: updatedProductLists
            };
        });


    }
});

export const { addStoreNearby, editProductInStore, deleteProductFromStore } = storeSlice.actions;

export default storeSlice.reducer;
