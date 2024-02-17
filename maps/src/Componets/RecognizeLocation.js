import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map";
import css from '../Css/RecognizeLocation.css'
const RecognizeLocation = () => {
    const [isAdd, setIsAdd] = useState(false);
    const nav = useNavigate();
    const { location } = useParams();
    const addAddress = (newAddress) => {
        setIsAdd(true);
    };

    useEffect(() => {
        if (isAdd) {
            nav('/delivers/' + true);
        }
    }, [isAdd, nav]);

    return (
        <>
        <link href={css} rel="stylesheet"></link>
            <Map location={location} />
            <p>מיקומך הוא: {location}</p>
            <button id="confirm" onClick={() => addAddress(location)}>אישור</button>
        </>
    );
}

export default RecognizeLocation;
