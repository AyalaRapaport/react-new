/*global google*/
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNearbyLocations, getOrders } from "../Redux/orderSlice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";
import Navbar from "./Navbar";
import axios from "axios";

const OrdersLocation = () => {
    const dispatch = useDispatch();
    const nearbyLocations = useSelector(state => state.orders.nearbyLocations);
    const ordersAddresses = useSelector(state => state.orders.ordersAddresses);
    const storesAddresses = useSelector(state => state.orders.storesAddresses);
    const x = useSelector(state => state.addresses.currentXCoordinate);
    const y = useSelector(state => state.addresses.currentYCoordinate);
    //courier location
    const singleLocation = { lat: x, lng: y };
    const [showMap, setShowMap] = useState(false);
    // const [isOrders, setIsOrders] = useState(false);
    const [checked, setChecked] = useState([]);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [xStore, setXStore] = useState(0);
    const [yStore, setYStore] = useState(0);
    const [formatAddressS, setFormatAddressS] = useState([]);
    const [multChoice, setMultChoice] = useState(false);
    const apiKey = useSelector(state => state.addresses.apiKey);
    // const distancesMatrix = [];

    useEffect(() => {
        dispatch(getOrders())
    }, []);

    useEffect(() => {
        if (ordersAddresses.length > 0) {
            // console.log(ordersAddresses);
            getNearbyLocations(singleLocation, storesAddresses, ordersAddresses);
        }
    }, [ordersAddresses]);

    useEffect(() => {
        if (nearbyLocations.length > 0&&x&&y) {
            
            nearbyLocations.forEach(async location => {
                let geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.stores.xStore},${location.stores.yStore}&result_type=street_address&key=${apiKey}`;
                await fetch(geocodingApiUrl)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status === 'OK') {
                            setFormatAddressS(prevState => [...prevState, data.results[0].formatted_address]);
                            // location.stores = { ...location.stores, address: data.results[0].formatted_address }
                        } else {
                            console.error('Error fetching address');
                        }
                    })
                    .catch(error => console.error('Error fetching address:', error));
            });
            const locations = [];
            nearbyLocations.forEach((location, i) => {
                locations.push({ XStore: location.stores.xStore,YStore:location.stores.yStore,XDestination:location.orders.lat,
                    YDestination:location.orders.lng ,IdOrder:location.orders.id,AddressOrder:location.orders.address,
                    CurrentX:x,CurrentY:y
                });
            });
            try {
                console.log(locations);
              const response = axios.post('https://localhost:7229/api/Locations', locations);
                
            } catch (error) {
                console.log(error);
            }

       }
    }, [nearbyLocations,x,y])

    function getNearbyLocations(singleLocation, storesAddresses, multipleLocations) {
        for (let i = 0; i < multipleLocations.length; i++) {
            const distance = calculateDistance(singleLocation, storesAddresses[i], multipleLocations[i]);
            if (distance <= 20) {
                dispatch(addNearbyLocations({ stores: storesAddresses[i], orders: multipleLocations[i] }));
            }
        }
    }

    function calculateDistance(location1, location2, location3) {
        //distance to store
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
        //distance from store
        const Slat1 = toRadians(location3.lat);
        const Slon1 = toRadians(location3.lng);
        const Slat2 = toRadians(location2.xStore);
        const Slon2 = toRadians(location2.yStore);
        const SdLat = Slat2 - Slat1;
        const SdLon = Slon2 - Slon1;

        const aa = Math.sin(SdLat / 2) * Math.sin(SdLat / 2) +
            Math.cos(Slat1) * Math.cos(Slat2) *
            Math.sin(SdLon / 2) * Math.sin(SdLon / 2);
        const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
        const distanceS = earthRadius * cc;
        return distance + distanceS;
    }

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    const handleToggle = async (value, lat, lng, xStore, yStore) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (!multChoice) {
            if (currentIndex !== -1) {
                newChecked.splice(currentIndex, 1);
                setShowMap(false);
            } else {
                newChecked.splice(0, newChecked.length, value);
                setShowMap(true);
                setLat(lat); setLng(lng);
                setXStore(xStore); setYStore(yStore)
            }

            setChecked(newChecked);
        }
        else {
            if (currentIndex === -1) {
                newChecked.push(value);
                setShowMap(false);
            } else {
                newChecked.splice(currentIndex, 1);
                setShowMap(false);
            }
            setChecked(newChecked);
        }
    };

    // async function fetchDistanceMatrix(x1, y1, x2, y2) {
    //     const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${x1},${y1}&destinations=${x2},${y2}&key=${apiKey}`);
    //     const data = await response.json();
    //     return data.rows[0].elements[0].distance.value; 
    // }

    useEffect(() => {
        if (showMap && !multChoice) {
            const directionsService = new window.google.maps.DirectionsService();
            const start = new window.google.maps.LatLng(x, y);
            const end1 = new window.google.maps.LatLng(xStore, yStore);
            const end2 = new window.google.maps.LatLng(lat, lng);

            const waypoints = [
                { location: end1, stopover: true },
                { location: end2, stopover: true }
            ];

            const request = {
                origin: start,
                destination: end2,
                waypoints: waypoints,
                optimizeWaypoints: true,
                travelMode: window.google.maps.TravelMode.DRIVING,

            };

            directionsService.route(request, (response, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const mapOptions = {
                        zoom: 20,

                        center: { lat: x, lng: y }
                    };
                    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
                    const directionsDisplay = new window.google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(map);
                    directionsDisplay.setDirections(response);

                } else {
                    console.error('Error fetching directions:', status);
                }
            });
        }
    }, [showMap, lat, lng, xStore, yStore]);


    return (
        <>
            <Navbar />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', float: 'right' }}>
                {formatAddressS && nearbyLocations?.length > 0 ? nearbyLocations.map((location, index) => (
                    < ListItem key={index} disablePadding >
                        <ListItemButton role={undefined} dense>
                            <ListItemText id={`checkbox-list-label-${index}`}>
                                <div>
                                    <p>מכתובת {formatAddressS[index]}</p>
                                    <p>לכתובת {location.orders.address}</p>
                                </div>
                            </ListItemText>


                            <ListItemIcon>
                                <Checkbox edge="end" checked={checked.indexOf(index) !== -1}
                                    onChange={() => { handleToggle(index, location.orders.lat, location.orders.lng, location.stores.xStore, location.stores.yStore); }}
                                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${index}` }} />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                )) : <ListItem><ListItemText primary="אין הזמנות באזורך" /></ListItem>}
            </List >
            {nearbyLocations?.length > 0 && !multChoice && <Button onClick={() => { setMultChoice(true); setChecked([]); setShowMap(false) }}>אפשר בחירה מרובה</Button>
            }
            {nearbyLocations?.length > 0 && multChoice && <Button onClick={() => { setMultChoice(false); setChecked([]) }}>בטל בחירה מרובה</Button>}
            {showMap && <div id="map" style={{ width: '100%', height: '400px' }}></div>}        </>
    );
}

export default OrdersLocation;
