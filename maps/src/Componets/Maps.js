// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

// const libraries = ['places'];
// const mapContainerStyle = {
//   width: '100%',
//   height: '400px',
// };

// const center = {
//   lat: 24.799448,
//   lng: 120.979021,
// };

// const Maps = () => {
//   const [address, setAddress] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [isLocationSelected, setIsLocationSelected] = useState(false);
//   const inputRef = useRef(null);
//   const searchBox = useRef(null);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk', 
//     libraries,
//   });

//     const onPlacesChanged = () => {
//       const places = searchBox.current.getPlaces();
//       console.log(places);
//       if (places && places.length > 0) {
//         console.log(isLocationSelected);
//         setAddress(places[0].formatted_address || '');
//         setSelectedLocation(places[0].geometry.location || null);
//         setIsLocationSelected(true); // Set the isLocationSelected state to true
//         console.log(isLocationSelected);

//       } else {
//         setAddress('');
//         setSelectedLocation(null);
//         setIsLocationSelected(false); // Set the isLocationSelected state to false
//       }
//   };

//   useEffect(() => {
//     if (isLoaded && selectedLocation) {
//       const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
//       searchBox.current = autocomplete;
//       autocomplete.addListener('place_changed', onPlacesChanged);
//     }
//   }, [isLoaded, selectedLocation]);
  

//   if (loadError) return <div>Error loading Google Maps</div>;
//   if (!isLoaded) return <div>Loading Google Maps</div>;

//   return (
//     <div>
//       <StandaloneSearchBox onLoad={(ref) => (searchBox.current = ref)}>
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Enter an address"
//           autoComplete="off"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//       </StandaloneSearchBox>
//       {isLocationSelected && (
//         <GoogleMap mapContainerStyle={mapContainerStyle} center={selectedLocation} zoom={10}>
//           {/* Add any additional components or markers you want to display on the map */}
//         </GoogleMap>
//       )}
//     </div>
//   );
// };

// export default Maps;
import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 24.799448,
  lng: 120.979021,
};

const Maps = () => {
  const [address, setAddress] = useState('');
  const [LocationSelected, setIsLocationSelected] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false); // הוסף דגל למצב ויזואלי של המפה
  const inputRef = useRef(null);
  const searchBox = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk',
    libraries,
  });

  const onPlacesChanged = () => {
    const places = searchBox.current.getPlaces();
    console.log(places);
    if (places && places.length > 0) {
      setAddress(places[0].formatted_address || '');
      setSelectedLocation(places[0].geometry.location || null);
      setIsLocationSelected(true);
      setIsMapVisible(true); // Set the isMapVisible state to true when a location is selected
    } else {
      setAddress('');
      setSelectedLocation(null);
      setIsLocationSelected(false);
      setIsMapVisible(false); // Set the isMapVisible state to false when no location is selected
    }
  };

  useEffect(() => {
    if (isLoaded && selectedLocation) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      searchBox.current = autocomplete;
      autocomplete.addListener('place_changed', onPlacesChanged);
    }
  }, [isLoaded, selectedLocation]);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Google Maps</div>;

  return (
    <div>
      <StandaloneSearchBox onLoad={(ref) => (searchBox.current = ref)}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter an address"
          autoComplete="off"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </StandaloneSearchBox>
      {isMapVisible && ( // Only render the map if isMapVisible is true
        <GoogleMap mapContainerStyle={mapContainerStyle} center={selectedLocation} zoom={10}>
          {/* Add any additional components or markers you want to display on the map */}
        </GoogleMap>
      )}
    </div>
  );
};

export default Maps;
