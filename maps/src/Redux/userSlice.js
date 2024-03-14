import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    userDetails: [],
    status: 'init',
    currentUser: null,
}
const apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

export const getUserDetailsById = createAsyncThunk(
    'userDetails',
    async (id) => {
        try {
            const response = await axios.get(`https://localhost:7229/api/User/${id}`);
            if (response.status === 200) {
                let user = response.data;
                const latitude = user.xCoordinate;
                const longitude = user.yCoordinate;
                let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`;
                await fetch(geocodingApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'OK') {
                            user = { ...user, address: data.results[0].formatted_address }

                        } else {
                            console.error('Error fetching address');
                        }
                    })
                    .catch(error => console.error('Error fetching address:', error));
                return user;
            }
        } catch (error) {
            console.log(error);
            return (error.message);
        }
    }
);

export const addUser = createAsyncThunk(
    'users/addUser',
    async (user) => {
        try {
            const isExist = await axios.get(`https://localhost:7229/api/Courier/${user.idUser}`);
            if(isExist.status===200)
            return true;
            const response = await axios.post('https://localhost:7229/api/User', {
                idUser: user.idUser,
                XCoordinate: user.XCoordinate,
                YCoordinate: user.YCoordinate,
                Name: user.Name,
                Email: user.Email,
                Password:user.Password
            });
            if (response.status === 200) {
                return response.data;
            }
        }
        catch (error) {
            return (error.message);
        }
    });

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserDetailsById.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.currentUser = action.payload;
        })
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.userDetails = action.payload;
        })
    },
}
)
export const { } = userSlice.actions

export default userSlice.reducer