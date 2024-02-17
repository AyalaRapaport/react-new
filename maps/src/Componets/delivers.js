import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Logo from "./Logo"
import wolt from '../Assets/Images/wolt.webp'
import '../Css/Delivers.css'
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../Redux/courierSlice";

const Delivers = () => {
    const nav = useNavigate();
    const { id } = useParams();
    // const [isOk, setIsOk] = useState(false);
    const [join, setJoin] = useState(false);
    const [recognizeLocation, setRecognizeLocation] = useState(false);
    const [currentAddress, setCurrentAddress] = useState("");
    // const [address, setAddress] = useState("");
    const [address, setAddress] = useState('');
    const details = useSelector(state => state.couriers.details);
    const status = useSelector(state => state.couriers.status);
    const dispatch = useDispatch();
    const apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';

    useEffect(() => {
        if (status === 'fulfilled') {
            const latitude = details.yCoordinate;
            const longitude = details.xCoordinate;
            let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`;
            fetch(geocodingApiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        setAddress( data.results[0].formatted_address);
                    } else {
                        console.error('Error fetching address');
                    }
                })
                .catch(error => console.error('Error fetching address:', error));
        }
    }, [status]);

    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address&key=${apiKey}`;
                fetch(geocodingApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'OK') {
                            setCurrentAddress(data.results[0].formatted_address);
                            setRecognizeLocation(true);
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
        dispatch(getDetails(id))
        // .then((response) => {
        //     console.log("Response from get:", response);
        //     console.log(status);
        // })
        // .catch((error) => {
        //     console.error("Error getting courier:", error);
        // });
    }, [id]);

    return (
        <>
            {status === 'fulfilled' &&
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {details.idCourier}
                        </Typography>
                        <Typography color="text.secondary">
                            {details.name}
                        </Typography>
                        <Typography variant="body2">
                            Phone: {details.phone}
                        </Typography>
                        <Typography variant="body2">
                            כתובת: {address}
                        </Typography>
                        <Typography variant="body2">
                            אימייל: {details.email}
                        </Typography>
                    </CardContent>
                    <button onClick={() => nav('/setCourierDetails/' + address)}>עריכה</button>
                </Card >
            }

            <Logo />
            {
                !join &&
                <>
                    <p> ?רוצה לקבל הודעות על משלוחים באזורך </p>
                    <button id="join" onClick={() => { setJoin(true); }}
                        style={{ width: '80%' }} >!!!כן</button> </>

            }
            {
                join && recognizeLocation && (
                    <div className="btnContainer">
                        <input className="btnLocation" value={"זהה מיקום"} type="button" onClick={() => nav(`/recognizeLocation/${currentAddress}`)} />
                        <input className="btnLocation" value={" בחר מיקום"} type="button" onClick={() => nav('/chooseLocation/' + true)} />
                    </div>
                )
            }
            {
                join && !recognizeLocation && (
                    <input className="btnLocation" value={" בחר מיקום"} type="button" onClick={() => nav('/chooseLocation/' + true)} />

                )

            }
            <Outlet />
            <img id='image' src={wolt} alt="wolt" />
        </>
    );
};

export default Delivers;
