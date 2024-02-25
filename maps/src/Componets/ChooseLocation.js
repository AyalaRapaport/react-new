import React, { useEffect, useRef, useState } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map";
import '../Css/Delivers.css'
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../Redux/addressSlice";
import axios from "axios";

const ChooseLocation = (props) => {
    const apiKey = useSelector(state => state.address.apiKey);
    const inputRef = useRef('');
    const searchBox = useRef(null);
    const address = useSelector(state => state.addresses.address);
    const [newAddress, setNewAddress] = useState('');
    const dispatch = useDispatch();
    let { showMap } = useParams();

    if (showMap) {
        showMap = true;
    }
    else {
        showMap = false;
    }
    const handlePlaceChanged = () => {
        console.log("jjj"+inputRef.current.value);
        setNewAddress(inputRef.current.value);
        dispatch(addAddress(newAddress));
        getAddressCoordinates(newAddress);

    };

        const getAddressCoordinates = async (address) => {
            debugger
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
                );
                const { lat, lng } = response.data.results[0].geometry.location;
                // setLatitude(lat);
                // setLongitude(lng);
                console.log("myaddress" + lat, lng);
            } catch (error) {
                console.error("Error getting coordinates:", error);
            }
        };
    useEffect(() => {
        console.log("Redux state updated: ", address);
    }, [address]);

    return (
        <>
            <StandaloneSearchBox onLoad={(ref) => (searchBox.current = ref)} onPlacesChanged={handlePlaceChanged}>
                <input
                    className="inpSearch"
                    ref={inputRef}
                    type="text"
                    placeholder="Enter an address"
                    autoComplete="on"
                    onChange={handlePlaceChanged}
                    defaultValue={props.address ? props.address.address : ''}
                />
            </StandaloneSearchBox>
            {newAddress&& showMap && <Map location={newAddress} />}
            {showMap && <button id="confirm"
                onClick={() => handlePlaceChanged()}>אישור</button>
            }
        </>
    );
};

export default ChooseLocation;
