import { configureStore } from "@reduxjs/toolkit";
import courierReducer from './courierSlice'
import addressReducer from './addressSlice'
import userSlice from './userSlice'
import productSlice from "./productSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import categorySlice from "./categorySlice";
import cartSlice from "./cartSlice";
import storeSlice from "./storeSlice";
import sessionStorage from "redux-persist/es/storage/session";
import orderSlice from "./orderSlice";

const reducers = {
  couriers: courierReducer,
  addresses: addressReducer,
  users: userSlice,
  products: productSlice,
  categories: categorySlice,
  inCart: cartSlice,
  stores: storeSlice,
  orders:orderSlice
}
const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage:sessionStorage,
  whitelist: ['couriers', 'users','categories'],
  // storage: storage,
  // blacklist: ['someReducerToExclude'],
  // stateReconciler: autoMergeLevel2,
  // serialize: false,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getdefaultMiddleware)=>
    getdefaultMiddleware({
      serializableCheck:{
        ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],       
      },
    })
});

export const persistor = persistStore(store);