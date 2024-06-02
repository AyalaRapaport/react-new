import React, { useEffect, useState } from 'react';
import '../Css/HomePage.css'
import Categories from './Categories';
import Stores from './Stores';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { addStoreNearby } from '../Redux/storeSlice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.currentUser);
    const stores = useSelector(state => state.stores.stores);
    const [showNearby, setshowNearby] = useState(false);
    const currentUser = useSelector(state => state.users.currentUser)
    const nav = useNavigate();
    const shopsNearby = () => {
        if (!showNearby) {
            setshowNearby(true);
            for (let i = 0; i < stores.length; i++) {
                const distance = calculateDistance({ lat: user.xCoordinate, lng: user.yCoordinate }, { xStore: stores[i].xCoordinate, yStore: stores[i].yCoordinate });
                if (distance <= 15) {
                    dispatch(addStoreNearby(stores[i]));
                }
            }
        }
        else
            setshowNearby(false);
    }

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    function calculateDistance(location1, location2) {
        const earthRadius = 6371;
        const lat1 = toRadians(location1.lat);
        const lon1 = toRadians(location1.lng);
        const lat2 = toRadians(location2.xStore);
        const lon2 = toRadians(location2.yStore);
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        return distance;
    }
   
    return (<>
        <Navbar />
        <div id='back'>
            <img alt='background' id='background' src={process.env.PUBLIC_URL + 'backwolt.png'} />
            <div id='details'>
                {user &&
                    <>
                        <p id='text'>היי {user.name} </p>
                        <p id='text'>{user.address}</p>
                        {!showNearby && <button  id='storeBtn' onClick={() => shopsNearby()}>חנויות באזורך</button>}
                        {showNearby && <button  id='storeBtn' onClick={() => shopsNearby()}>הצגת כל החנויות </button>}
                    </>
                }
            </div>
        </div >
        {currentUser?.idUser=='326546033'&&<>
            <Button onClick={() => nav('/addStore')}>הוספת חנות</Button>
            <Button onClick={() => nav('/addCategory')}>הוספת קטגוריה</Button>
        </>}
        {showNearby && <Stores showNearby={showNearby} />
        }
        {
            !showNearby &&
            <>
                <Stores />
                <Categories />
            </>
        }
    </>);
}

export default HomePage;