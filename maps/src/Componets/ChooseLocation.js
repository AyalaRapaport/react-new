import React, { useEffect, useRef, useState } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map";
import '../Css/Delivers.css'
import { useDispatch, useSelector } from "react-redux";
import { addAddress, addcurrentAddress, currentXCoordinate, currentYCoordinate } from "../Redux/addressSlice";
import axios from "axios";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

const ChooseLocation = (props) => {
    const apiKey = useSelector(state => state.addresses.apiKey);
    const inputRef = useRef('');
    const searchBox = useRef(null);
    const address = useSelector(state => state.addresses.address);
    const [newAddress, setNewAddress] = useState('');
    const dispatch = useDispatch();
    let { showMap } = useParams();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const details = useSelector(state => state.couriers.currentCourier);
    const nav = useNavigate();
    if (showMap) showMap = true;
    else showMap = false;

    const handlePlaceChanged = () => {
        setNewAddress(inputRef.current.value);
    };
    // useEffect(() =>{
    //     console.log(!showMap ,address)
    // },[])
    const getAddressCoordinates = async (address) => {
        try {
            console.log(address);
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
            );
            const { lat, lng } = response.data.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
            console.log("myaddress" + lat, lng);
        } catch (error) {
            console.error("Error getting coordinates:", error);
        }
    };

    const ok = async () => {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${inputRef.current.value}&key=${apiKey}`
        );
        console.log(response);
        if (response.data.results[0]) {
            const { lat, lng } = response.data.results[0].geometry.location;
            if (lat && lng) {
                setNewAddress(inputRef.current.value);
                dispatch(addAddress(newAddress));
                getAddressCoordinates(inputRef.current.value);
                dispatch(addcurrentAddress(newAddress));
                dispatch(currentXCoordinate(latitude));
                dispatch(currentYCoordinate(longitude));
                nav('/calculateDistance');

                if (showMap) {
                    nav('/delivers/' + true);
                }
            } else {
                alert('בחר כתובת מהרשימה');
            }
        } else {
            alert('בחר כתובת מהרשימה');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StandaloneSearchBox onLoad={(ref) => (searchBox.current = ref)} onPlacesChanged={handlePlaceChanged}>
                <input
                    // style={{width:'200%'}}
                    className="inpSearch"
                    ref={inputRef}
                    type="text"
                    placeholder="Enter an address"
                    autoComplete="on"
                    defaultValue={showMap ? '' : details.address}
                />
            </StandaloneSearchBox>
            {newAddress && <Button sx={{ fontSize: 'large' }} onClick={() => ok()}>אישור</Button>}
            {newAddress && showMap && <Map location={newAddress} />}
        </div>
    );

};

export default ChooseLocation;
