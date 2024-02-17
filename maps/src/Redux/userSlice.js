import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    userDetails: [],
    status: 'init'
}

export const getDetails = createAsyncThunk(
    'userDetails',
    async (id) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/User/${id}`);
            if (response.status === 200) {
                return response.data;
            } else {
                console.log("not courier");
                return ("not user");
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);
export const setDetails = createAsyncThunk(
    'setDetails',
    async (user) => {
        const response = await axios.put(`https://localhost:7229/api/User/${user.idCourier}`, {
            // IdCourier: courier.IdCourier,
            // IsActive: courier.IsActive,
            // XCoordinate: courier.XCoordinate,
            // YCoordinate: courier.YCoordinate,
            // Name: courier.Name,
            // Email: courier.Email,
            // Phone: courier.Phone,
            // LastShipment: courier.Date
        });
    }
);

export const addUser = createAsyncThunk(
    'users/addUser',
    async (user) => {
        try {
            const response = await axios.post('https://localhost:7229/api/User', {
                idUser:user.idUser,
                XCoordinate:user.XCoordinate,
                YCoordinate: user.YCoordinate,
                Name: user.Name,
                Email: user.Email,
            });
            console.log("res"+response.data);
            if (response.status === 200) {
                return response.data;
            } 
        }
        catch (error) {
            console.log("errorrrrrrrr" + error);
            return (error.message);
        }
    });

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getDetails.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.details = action.payload
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            console.log(action.payload);
            state.details = action.payload
        })
    },
}
)
export const { } = userSlice.actions

export default userSlice.reducer