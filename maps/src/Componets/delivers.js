import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Logo from "./Logo"
import wolt from '../Assets/Images/wolt.webp'
import '../Css/Delivers.css'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import Navbar from './Navbar';
import { addcurrentAddress, currentXCoordinate, currentYCoordinate } from "../Redux/addressSlice";
const Delivers = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [join, setJoin] = useState(false);
    const [recognizeLocation, setRecognizeLocation] = useState(false);
    const [currentAddress, setCurrentAddress] = useState("");
    const [address, setAddress] = useState('');
    const details = useSelector(state => state.couriers.currentCourier);
    const status = useSelector(state => state.couriers.status);
    const dispatch = useDispatch();
    const apiKey = useSelector(state => state.addresses.apiKey);
    // const latitude = details.yCoordinate;
    // const longitude = details.xCoordinate;

    // useEffect(() => {
    //     dispatch(getDetailsById(id))
    // }, [id]);

    useEffect(() => {
        console.log(details);
    }, [details]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let latitude2 = position.coords.latitude;
                let longitude2 = position.coords.longitude;
                let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude2},${longitude2}&result_type=street_address&key=${apiKey}`;
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

const addLocation=()=>{
    dispatch(currentXCoordinate(details.xCoordinate));
    dispatch(currentYCoordinate(details.yCoordinate));
    dispatch(addcurrentAddress(details.address));
    nav('/ordersLocation')
}
    return (
        <>
            <Navbar />
            <button onClick={() => { nav('/calculateDistance') }}>calculateDistance</button>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <div id="location">
                        {!join &&
                            <div style={{ textAlign: 'center', marginTop: '10vb', flex: 1 }}>
                                <p> ?רוצה לקבל הודעות על משלוחים באזורך </p>
                                <Button id="join" onClick={() => { setJoin(true); }} style={{ width: '80%' }}>!!!כן</Button>
                            </div>
                        }

                        {join && recognizeLocation && (
                            <div className="btnContainer">
                                <input className="btnLocation" value={"זהה מיקום"} type="button" onClick={() => nav(`/recognizeLocation/${currentAddress}`)} />
                                <input className="btnLocation" value={" בחר מיקום"} type="button" onClick={() => nav('/chooseLocation/' + true)} />
                                <input className="btnLocation" value={details.address} type="button" onClick={() => { addLocation() }} />

                            </div>
                        )}

                        {join && !recognizeLocation && (
                            <>
                                <input className="btnLocation" value={" בחר מיקום"} type="button" onClick={() => nav('/chooseLocation/' + true)} />
                                <input className="btnLocation" value={details.address} type="button" onClick={() => { addLocation() }} />
                            </>
                        )}
                        <Outlet />
                        <img id='image' src={wolt} alt="wolt" />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {status === 'fulfilled' &&
                        <Card sx={{ marginRight: 0, width: '50%', padding: '1rem', margin: '1rem', textAlign: 'right', alignSelf: 'flex-end' }} variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="label" color="text.secondary">
                                    שם
                                </Typography>
                                <Typography variant="body1" component="div">
                                    {details.name}
                                </Typography>
                                <Typography variant="h5" component="label" color="text.secondary">
                                    תעודת זהות
                                </Typography>
                                <Typography variant="body1">
                                    {details.idCourier}
                                </Typography>
                                <Typography variant="h5" component="label" color="text.secondary">
                                    טלפון
                                </Typography>
                                <Typography variant="body1">
                                    {details.phone}
                                </Typography>
                                <Typography variant="h5" component="label" color="text.secondary">
                                    כתובת
                                </Typography>
                                <Typography variant="body1">
                                    {details.address}
                                </Typography>
                                <Typography variant="h5" component="label" color="text.secondary">
                                    אימייל
                                </Typography>
                                <Typography variant="body1">
                                    {details.email}
                                </Typography>
                                <Button sx={{ fontSize: 'large' }} onClick={() => nav('/setCourierDetails')}>עריכה</Button>
                            </CardContent>
                        </Card>
                    }
                </Grid>
            </Grid>
        </>
    );
};

export default Delivers;
