import { configureStore } from "@reduxjs/toolkit";
import courierReducer from './courierSlice'
import addressReducer from './addressSlice'
import userSlice from './userSlice'
import productSlice from "./productSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import categorySlice from "./categorySlice";

const reducers={
            couriers: courierReducer,
            addresses:addressReducer,
            users:userSlice,
            products:productSlice,
            categories:categorySlice
        
        }
const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['couriers', 'users'] 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);