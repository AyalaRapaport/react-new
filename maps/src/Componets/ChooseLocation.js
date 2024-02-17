import React, { useEffect, useRef, useState } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map";
import '../Css/Delivers.css'
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../Redux/addressSlice";
const ChooseLocation = (props) => {
    console.log("props" + props.address);
    const inputRef = useRef('');
    const searchBox = useRef(null);
    const nav = useNavigate();
    const address = useSelector(state => state.addresses.address);
    const [newAddress, setNewAddress] = useState('');
    const [isAdd, setIsadd] = useState(false);
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
        setIsadd(true);
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
