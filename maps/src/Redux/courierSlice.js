import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    details: [],
    status: 'init'
}

export const getDetails = createAsyncThunk(
    'courierDetails',
    async (id) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/Courier/${id}`);
            if (response.status === 200) {
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
export const setDetails = createAsyncThunk(
    'setDetails',
    async (courier) => {
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
            console.log("errorrrrrrrr" + error);
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
        builder.addCase(addCourier.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.log(action.payload);
            state.details = action.payload
        })
    },
}
)
export const { } = courierSlice.actions

export default courierSlice.reducer