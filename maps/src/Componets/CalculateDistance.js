import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNearbyLocations, getOrders } from "../Redux/orderSlice";

const CalculateDistance = () => {
    const dispatch = useDispatch();
    const ordersAddresses = useSelector(state => state.orders.ordersAddresses);
    const x = useSelector(state => state.addresses.currentXCoordinate);
    const y = useSelector(state => state.addresses.currentYCoordinate);
    const singleLocation = { lat: x, lng: y };

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    useEffect(() => {
        console.log(ordersAddresses);
        if (ordersAddresses.length > 0) {
            getNearbyLocations(singleLocation, ordersAddresses);
        }
    }, [ordersAddresses]);

    function getNearbyLocations(singleLocation, multipleLocations) {
        
        console.log(singleLocation, multipleLocations);
        for (let i = 0; i < multipleLocations.length; i++) {
            const distance = calculateDistance(singleLocation, multipleLocations[i]);

            if (distance <= 15) {
                dispatch(addNearbyLocations(multipleLocations[i]));
            }
        }
    }

    function calculateDistance(location1, location2) {
        const earthRadius = 6371;
        const lat1 = toRadians(location1.lat);
        const lon1 = toRadians(location1.lng);
        const lat2 = toRadians(location2.lat);
        const lon2 = toRadians(location2.lng);
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;

        return distance;
    }

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

}

export default CalculateDistance;
