import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../Redux/orderSlice";

const CalculateDistance = () => {
    const dispatch = useDispatch();
    const ordersAddresses = useSelector(state => state.orders.ordersAddresses);

    useEffect(() => {
        dispatch(getOrders());
    }, [])

    useEffect(() => {
        console.log(ordersAddresses);
    }, [ordersAddresses])

    function getNearbyLocations(singleLocation, multipleLocations) {
        // מערך לאחסון המיקומים הרחוקים עד 15 קילומטר מהמיקום הבודד
        var nearbyLocations = [];

        // ללולאה עבור כל מיקום במערך
        for (var i = 0; i < multipleLocations.length; i++) {
            // חשב את המרחק בין המיקום הבודד למיקום הנוכחי בלולאה
            var distance = calculateDistance(singleLocation, multipleLocations[i]);

            // אם המרחק פחות מ-15 קילומטרים, הוסף את המיקום למערך nearbyLocations
            if (distance <= 15) {
                nearbyLocations.push(multipleLocations[i]);
            }
        }

        // החזר את המיקומים הרחוקים עד 15 קילומטר מהמיקום הבודד
        return nearbyLocations;
    }

    // פונקציה לחישוב מרחק בין שני מיקומים בקואורדינטות
    function calculateDistance(location1, location2) {
        // חישוב מרחק בין שני נקודות בקואורדינטות עפ"י נוסחת ההוריזונטים
        var earthRadius = 6371; // רדיוס כדור הארץ בקילומטרים
        var lat1 = toRadians(location1.lat);
        var lon1 = toRadians(location1.lng);
        var lat2 = toRadians(location2.lat);
        var lon2 = toRadians(location2.lng);
        var dLat = lat2 - lat1;
        var dLon = lon2 - lon1;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = earthRadius * c;

        return distance;
    }

    // פונקציה להמרת מעלות לרדיאנים
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    var singleLocation = { lat: 32.0534741, lng: 34.9569981 }
        //  var singleLocation = {  lat:  31.52269399999999 , lng:34.595581 };
        ;
    var multipleLocations = [
        { lat: 32.0065004, lng: 34.9511782 },//שוהם
        { lat: 32.0518487, lng: 34.9547982 },// אלעד
        { lat: 31.52269399999999, lng: 34.595581 },//שדרות
        { lat: 31.311337, lng: 34.622824 },//אופקים
        { lat: 32.1064367, lng: 34.8437016 },//בני ברק

    ];

    var nearbyLocations = getNearbyLocations(singleLocation, multipleLocations);
    console.log(nearbyLocations);

    return (<>

    </>);
}

export default CalculateDistance;