import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map";
import css from '../Css/RecognizeLocation.css'
import { useDispatch, useSelector } from "react-redux";
import { addcurrentAddress, currentXCoordinate, currentYCoordinate } from "../Redux/addressSlice";
import { removeNearbyLocations } from "../Redux/orderSlice";
const RecognizeLocation = () => {
    const [isAdd, setIsAdd] = useState(false);
    const apiKey = useSelector(state => state.addresses.apiKey);
    const nav = useNavigate();
    const { location } = useParams();
    const [currentAddress, setCurrentAddress] = useState("");
    const dispatch = useDispatch();
    const [lat,setLat]=useState(0);
    const [long,setLong]=useState(0);

    const addAddress = () => {
        setIsAdd(true);
        dispatch(addcurrentAddress(currentAddress));
        dispatch(currentXCoordinate(lat));
        dispatch(currentYCoordinate(long));
        dispatch(removeNearbyLocations());
        nav('/ordersLocation')
        };


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                 setLong  (position.coords.longitude);
                let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=street_address&key=${apiKey}`;
                fetch(geocodingApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'OK') {
                            setCurrentAddress(data.results[0].formatted_address);
                        } else {
                            console.error('שגיאה בשליפת כתובת');
                        }
                    })
                    .catch(error => console.error('שגיאה בשליפת כתובת:', error));
            });
        } else {
            console.log("הדפדפן לא תומך בגישה למיקום");
        }
    }, []);

    useEffect(() => {
        if (isAdd) {
            nav('/delivers/' + true);
        }
    }, [isAdd]);

    return (
        <>
            <link href={css} rel="stylesheet"></link>
            <Map location={location} />
            <p>מיקומך הוא: {location}</p>
            <button id="confirm" onClick={() => addAddress()}>אישור</button>
        </>
    );
}

export default RecognizeLocation;
