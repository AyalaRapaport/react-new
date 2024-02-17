import { useEffect } from 'react';
import css from '../Css/Map.css'
const Map = (props) => {
    let location=props.location;
    console.log("props"+location);
    useEffect(() => {
        const geocoder = new window.google.maps.Geocoder();
        const mapOptions = {
            zoom: 15,
            center: { lat: -34.397, lng: 150.644 }
        };
        const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

        geocoder.geocode({ 'address': location }, function (results, status) {
            if (status === 'OK') {
                console.log('Geocode  ' + status);

                map.setCenter(results[0].geometry.location);
                new window.google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
                // alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }, [location]);

    return (
        <>
            <link href={css} rel="stylesheet"></link>
            <div id="map" style={{ height: '70vh', width: '45%' }}></div>
        </>

    );
}

export default Map;