import { configureStore } from "@reduxjs/toolkit";
import courierReducer from './courierSlice'
import addressReducer from './addressSlice'
import userSlice from './userSlice'
import productSlice from "./productSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import categorySlice from "./categorySlice";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

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
  whitelist: ['couriers', 'users'], 
  // keyPrefix: 'myApp:',
  // הגדלת המספר המרבי של האחסון ל-50MB
  // כרגע הערך המרבי הוא ברירת המחדל של 5MB
  // אתה יכול לשנות את זה באמצעות הגדרת maxSize
  // מומלץ לבדוק את ההגבלות של כל דפדפן לגבי אחסון מקומי
  // אם אתה שומר יותר מ-5MB, ייתכן שיהיה עליך לבדוק את הגבולות ולנתח כיצד לשפר את הביצועים
  // storage: storage,
  // blacklist: ['someReducerToExclude'],
  // stateReconciler: autoMergeLevel2,
  // serialize: false,
  // debug: true,
  // // הגדלת המספר המרבי של האחסון ל-50MB
  // maxSize: 50 * 1024 * 1024
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);