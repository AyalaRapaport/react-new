import { useEffect, useRef, useState } from 'react';
import css from '../Css/CourierDetails.css'
import Logo from './Logo';
import axios from 'axios';
import ChooseLocation from './ChooseLocation';
import { useDispatch, useSelector } from 'react-redux';
import { addCourier } from '../Redux/courierSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { StandaloneSearchBox } from '@react-google-maps/api';

const CourierDetails = () => {
    const refName = useRef();
    const refEmail = useRef();
    const refPhone = useRef();
    const refId = useRef();
    const refPassword = useRef();
    const [isCorrect, setIsCorrect] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidIsraeliId, setIsValidIsraeliId] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const searchBox = useRef();
    const inputRef = useRef();
    const [isJoin, setIsJoin] = useState(false);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const apiKey = useSelector(state => state.addresses.apiKey);
    const [courier, setCourier] = useState({
        IdCourier: "",
        IsActive: false,
        XCoordinate: 0,
        YCoordinate: 0,
        Password:'',
        Name: "",
        Email: "",
        Phone: "",
        Date: ""
    });

    const checkAddress = async (inputRef) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${inputRef}&key=${apiKey}`
            );
            if (response.data.results[0]) {
                const { lat, lng } = response.data.results[0].geometry.location;
                if (lat && lng) {
                    if (lat > 29.3 && lat < 33.7 && lng > 33.5 && lng < 36.3) {
                        setLatitude(lat);
                        setLongitude(lng);
                    }
                    else {
                        alert('בחר כתובת בישראל');
                        setLatitude(0);
                        setLongitude(0);
                    }
                }
            }
        }
        catch (error) {
            alert('בחר כתובת קיימת מישראל');
            console.error("Error getting coordinates:", error);
        }
    }

    const handlePlaceChanged = () => {
        // setNewAddress(inputRef.current.value);
    }

    const HandleConfirmation = () => {
        const isNameValid = /^[A-Za-zא-ת\s]+$/u.test(refName.current.value) && refName.current.value.length > 1;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(refEmail.current.value);
        const isIsraeliIdValid = /^\d{9}$/.test(refId.current.value);
        const isPhoneNumberValid = /^\d{10}$/.test(refPhone.current.value);
        const isPasswordValid = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{3,}$/.test(refPassword.current.value);

        setIsConfirm(true);
        setIsValidName(isNameValid);
        setIsValidEmail(isEmailValid);
        setIsValidIsraeliId(isIsraeliIdValid);
        setIsValidPhoneNumber(isPhoneNumberValid);
        setIsValidPassword(isPasswordValid);

        if (isNameValid && isEmailValid && isIsraeliIdValid && isPhoneNumberValid&&isPasswordValid && longitude && latitude) {
            setCourier({
                IdCourier: refId.current.value,
                IsActive: false,
                XCoordinate: latitude,
                YCoordinate: longitude,
                Name: refName.current.value,
                Email: refEmail.current.value,
                Phone: refPhone.current.value,
                Password:refPassword.current.value,
                lastShipment: new Date().toISOString()
            });
            setIsCorrect(true);
        }
        else {
            setIsCorrect(false);
            alert('כתובת אינה תקינה')
        }
    }

    useEffect(() => {
        if (isCorrect) {
            {
                dispatch(addCourier(courier))
                    .then((response) => {
                        if (response.payload === true) {
                            alert('שליח כבר קיים');
                            nav('/courierDetails')
                            setIsJoin(false);
                            setIsCorrect(false);
                        }
                        else
                            setIsJoin(true);
                    })
                    .catch((error) => {
                        console.error("Error adding courier:", error);
                        setIsCorrect(false);
                    });
            }
        }
    }, [isCorrect]);

    return (
        <>
            <link href={css} rel="stylesheet" />
            <Navbar />
            {!isJoin && (
                <div className="container">
                    <form>
                        <div className="row">
                            <h3>פרטי שליח</h3>
                            <label htmlFor="name"><i className="fa fa-user"></i> שם מלא</label>
                            <input ref={refName} type="text" maxLength="25" id="fname" name="firstname" placeholder="John M. Doe" required />
                            {!isValidName && isConfirm && (
                                <span className="error-message">שם לא תקין</span>
                            )}
                            <label htmlFor='id'><i className="fa fa-envelope"></i> תעודת זהות</label>
                            <input ref={refId} type="text" id="id" name="id" placeholder="123456789" />
                            {!isValidIsraeliId && isConfirm && (
                                <span className="error-message">תעודת זהות לא תקינה</span>
                            )}
                            <label htmlFor="email"><i className="fa fa-envelope"></i> אימייל</label>
                            <input ref={refEmail} type="text" id="email" name="email" placeholder="john@example.com" />
                            {!isValidEmail && isConfirm && (
                                <span className="error-message">אימייל לא תקין</span>
                            )}
                            <label><i className="fa fa-envelope"></i> טלפון</label>
                            <input ref={refPhone} type="text" id="phone" name="phone" placeholder="050-2345678" />
                            {!isValidPhoneNumber && isConfirm && (
                                <span className="error-message">מספר טלפון לא תקין</span>
                            )}
                            <label><i className="fa fa-envelope"></i> ססמא</label>
                            <input ref={refPassword} type="text"  />
                            {!isValidPhoneNumber && isConfirm && (
                                <span className="error-message">  הקש לפחות ספרות/אותיות </span>
                            )}
                            <label> כתובת</label>
                            {/* <ChooseLocation address={address} /> */}
                            <StandaloneSearchBox onLoad={(ref) => (searchBox.current = ref)} onPlacesChanged={handlePlaceChanged}>
                                <input onBlur={() => checkAddress(inputRef.current.value)} className="inpSearch" ref={inputRef} type="text" placeholder="בחר כתובת" autoComplete="on"
                                />
                            </StandaloneSearchBox>
                            <input className="btn" type='button' value={"אישור"} onClick={HandleConfirmation} />
                            <div className="row">
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isJoin && (
                <div style={{textAlign:"center"}}>
                    <h3> wolt מזל טוב!! הצטרפת ל</h3>
                    <p>פרטייך נשמרו במערכת,ניתן לשנותם באיזור האישי</p>
                    <p>בכל שעה שתרצה ניתן להכנס לאיזור האישי ולצפות במשלוחים באזורך</p>
                </div>
            )}
        </>
    );
}

export default CourierDetails;
