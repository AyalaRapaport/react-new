import React, { useEffect, useState } from 'react';
import css from '../Css/HomePage.css'
import background from '../Assets/Images/1.jpg'
import Categories from './Categories';
import Stores from './Stores';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { getStores } from '../Redux/storeSlice';
import { getCategory, getStoresByCat } from '../Redux/categorySlice';

const HomePage = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getStores()).then(() => {
            dispatch(getCategory()).then(() => {
                dispatch(getStoresByCat());
            });
        });
    }, []);
    
    return (<>
        <link href={css} rel="stylesheet" />
        <Navbar />
        <div id='back'>
            <img alt='background' id='background' src={process.env.PUBLIC_URL + '1.png'} /></div>
        <Stores />
        <Categories />
        {/* <Products/> */}
    </>);
}

export default HomePage;