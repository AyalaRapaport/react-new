import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { useState } from 'react';

const initialState = {
    details: [],
    status: 'init',
    currentCourier: null,
}

const apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

export const getDetails = createAsyncThunk(
    'courierDetails',
    async () => {
        try {
            const response = await axios.get(`https://localhost:7229/api/Courier`);
            const details = response.data;
            if (response.status === 200) {
                for (let index = 0; index < details.length; index++) {
                    let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${details.XCoordinate},${details.yCoordinate}&result_type=street_address&key=${apiKey}`;
                    fetch(geocodingApiUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status === 'OK') {
                                details[index] = { ...details[index], address: data.results[0].formatted_address }
                            } else {
                                console.error('Error fetching address');
                            }
                        })
                        .catch(error => console.error('Error fetching address:', error))
                }
                return response.data;
            } else {
                console.log("not courier");
                return false;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const getDetailsById = createAsyncThunk(
    'getDetailsById',
    async (id) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/Courier/${id}`);
            if (response.status === 200) {
                let courier = response.data;
                let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${courier.xCoordinate},${courier.yCoordinate}&result_type=street_address&key=${apiKey}`;
                console.log(geocodingApiUrl);
                
                const geocodingResponse = await fetch(geocodingApiUrl);
                const data = await geocodingResponse.json();
                
                if (data.status === 'OK') {
                    console.log("in");
                    courier = { ...courier, address: data.results[0].formatted_address };
                } else {
                    console.error('Error fetching address');
                }
                
                return courier;
            } else {
                console.log("not courier");
                return false;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const setDetails = createAsyncThunk(
    'setDetails',
    async (courier) => {
        debugger
        try {
            const response = await axios.put(`https://localhost:7229/api/Courier/${courier.IdCourier}`, {
                IdCourier: courier.IdCourier,
                IsActive: courier.IsActive,
                XCoordinate: courier.XCoordinate,
                YCoordinate: courier.YCoordinate,
                Name: courier.Name,
                Email: courier.Email,
                Phone: courier.Phone,
                LastShipment: courier.Date
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.log("error" + error);
            return (error.message);
        }
    }
);

export const addCourier = createAsyncThunk(
    'couriers/addCourier',
    async (courier) => {
        try {
            const response = await axios.post('https://localhost:7229/api/Courier', {
                idCourier: courier.IdCourier,
                isActive: courier.IsActive,
                xCoordinate: courier.XCoordinate,
                yCoordinate: courier.YCoordinate,
                name: courier.Name,
                email: courier.Email,
                phone: courier.Phone,
                lastShipment: courier.Date

            });
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("not courier");
                return ("not courier");
            }
        }
        catch (error) {
            console.log("errorrrrrrrr" + error);
            return (error.message);
        }
    });

export const courierSlice = createSlice({
    name: 'courier',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getDetails.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.details = action.payload
        })
        builder.addCase(getDetailsById.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.log(action.payload);
            state.currentCourier = action.payload
        })
        builder.addCase(addCourier.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.details = action.payload
        })
    },
}
)
export const { } = courierSlice.actions

export default courierSlice.reducer