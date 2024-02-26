import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'https://localhost:7229/api';
const apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';


const initialState = {
    orders: [],
    ordersAddresses: [],
    status: 'init'
}

export const getOrders = createAsyncThunk(
    'getOrders',
    async () => {
        try {
            const response = await axios.get(`${url}/Order`);
            if (response.status === 200) {
                let orders = response.data;
                console.log(orders);
                for (let i = 0; i < orders.length; i++) {
                    const latitude = orders[i].xCoordinate;
                    const longitude = orders[i].yCoordinate;
                    console.log(latitude,longitude);
                    let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`;
                    fetch(geocodingApiUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'OK') {
                                orders[i] = { ...orders[i], address: data.results[0].formatted_address }

                            } else {
                                console.error('Error fetching address');
                            }
                        })
                        .catch(error => console.error('Error fetching address:', error));
                }
                return response.data;
            }

        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const setOrder = createAsyncThunk(
    'setOrder',
    async (order) => {
        const response = await axios.put(`${url}/Order/${order.Id}`, {
            // IdCourier: courier.IdCourier,
            // XCoordinate: courier.XCoordinate,
            // YCoordinate: courier.YCoordinate,
            // Name: courier.Name,          
        });
    }
);

export const addOrder = createAsyncThunk(
    'addOrder',
    async (order) => {
        try {
            const response = await axios.post(`${url}/Order`, {
                // idUser:user.idUser,
                // XCoordinate:user.XCoordinate,
                // YCoordinate: user.YCoordinate,
                // Name: user.Name,
                // Email: user.Email,
            });
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error) {
            return (error.message);
        }
    });

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.orders = action.payload
            for (let i = 0; i < state.orders; i++) {
                state.ordersAddresses.push({x:state.orders[i].XCoordinate,y:state.orders[i].YCoordinate})
            }
        })
    },
}
)
export const { } = orderSlice.actions

export default orderSlice.reducer