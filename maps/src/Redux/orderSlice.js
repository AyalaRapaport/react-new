import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const url = 'https://localhost:7229/api';
const apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

const initialState = {
    orders: [],
    ordersAddresses: [],
    status: 'init',
    nearbyLocations: [],
    storesAddresses: [],
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
                    let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`;
                    await fetch(geocodingApiUrl)
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
                return orders;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

// export const setOrder = createAsyncThunk(
//     'setOrder',
//     async (order) => {
//         const response = await axios.put(`${url}/Order/${order.Id}`, {
//             IdCourier: courier.IdCourier,
//             XCoordinate: courier.XCoordinate,
//             YCoordinate: courier.YCoordinate,
//             Name: courier.Name,          
//         });
//         return response;
//     }
// );

export const addOrder = createAsyncThunk(
    'addOrder',
    async (order) => {

        try {       
            const response = await axios.post(`${url}/Order`, {
                xCoordinate: order.xCoordinate,
                yCoordinate: order.yCoordinate,
                orderingName: order.orderingName,
                storeId: order.storeId,
                orderDate: order.orderDate,
                isTaken: order.isTaken,
                isDone: order.isDone,
            });
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error) {
            console.log(error);
            return (error.message);
        }
    });

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addNearbyLocations: (state, action) => {
            const existingLocation = state.nearbyLocations.find((loc) => loc?.orders.id === action.payload.orders.id);
            if (!existingLocation) {
                state.nearbyLocations.push(action.payload)
            }
        },
        removeNearbyLocations: (state) => {
            state.nearbyLocations = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            if (state.status !== 'fulfilled') {
                state.status = 'fulfilled';
                state.orders = action.payload;
                state.orders.forEach((order) => {
                    const store = order.store;
                    state.ordersAddresses.push({
                        lat: order.xCoordinate, lng: order.yCoordinate, id: order.id, address: order.address
                    });
                    state.storesAddresses.push({
                        xStore: store.xCoordinate, yStore: store.yCoordinate
                    })
                })

                //             state.orders.forEach(async (order) => {
                //                 const store = order.store;
                //                 console.log(store.xCoordinate);
                //                 const latitude = store.xCoordinate;
                //                 const longitude = store.yCoordinate;
                //                 debugger
                //                 let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`;
                //                 await fetch(geocodingApiUrl)
                //                     .then(response => response.json())
                //                     .then(data => {
                //                         if (data.status === 'OK') {
                //                             let storeAddress = data.results[0].formatted_address;
                //                             state.ordersAddresses.push({
                //                                 storeAddress: storeAddress, xStore: store.xCoordinate, yStore: store.yCoordinate, lat: order.xCoordinate,
                //                                 lng: order.yCoordinate, id: order.id, address: order.address
                //                             });
                //                         } else {
                //                             console.error('Error fetching address');
                //                         }
                //                     })
                //                     .catch(error => console.error('Error fetching address:', error));

                //             });
                //             console.log(state.ordersAddresses);
            }
        });
    },
});

export const { addNearbyLocations, removeNearbyLocations } = orderSlice.actions;

export default orderSlice.reducer;
