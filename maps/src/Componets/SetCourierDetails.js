import { useEffect, useRef, useState } from 'react';
import css from '../Css/CourierDetails.css'
import Logo from './Logo';
import axios from 'axios';
import ChooseLocation from './ChooseLocation';
import { useParams } from 'react-router-dom';
import { getDetails, setDetails } from '../Redux/courierSlice';
import { useDispatch, useSelector } from 'react-redux';

const SetCourierDetails = () => {
    // const addressFormat = useSelector(state=>state.couriers.currentCourier);
    const refName = useRef();
    const refEmail = useRef();
    const refPhone = useRef();
    const [isCorrect, setIsCorrect] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const details = useSelector(state => state.couriers.currentCourier);
    const statusAddress = useSelector(state => state.addresses.statusAddress);
    const dispatch = useDispatch();
    const address = useSelector(state => state.addresses.address);
    const apiKey = useSelector(state => state.addresses.apiKey)
    const [courier, setCourier] = useState({
        IdCourie: "",
        IsActive: false,
        XCoordinate: 0,
        YCoordinate: 0,
        Name: "",
        Email: "",
        Phone: "",
        Date: ""
    });

    useEffect(() => {
        const getAddressCoordinates = async () => {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
                );
                if (response.data.results[0]) {
                    const { lat, lng } = response.data.results[0].geometry.location;
                    if (lat && lng) {
                        setIsAddressValid(true);
                        setLatitude(lat);
                        setLongitude(lng);
                        console.log("lng" + lat, lng);
                    }
                }
            } catch (error) {
                console.error("Error getting coordinates:", error);
            }
        };
        if (statusAddress)
            getAddressCoordinates();
    }, [statusAddress, address]);


    const HandleConfirmation = () => {
        const isNameValid = /^[A-Za-zא-ת\s]+$/u.test(refName.current.value) && refName.current.value.length > 1;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(refEmail.current.value);
        const isPhoneNumberValid = /^\d{10}$/.test(refPhone.current.value);
        setIsConfirm(true);
        setIsValidName(isNameValid);
        setIsValidEmail(isEmailValid);
        setIsValidPhoneNumber(isPhoneNumberValid);

        if (isNameValid && isEmailValid && isPhoneNumberValid && isAddressValid) {
            setCourier({
                IdCourier: details.idCourier,
                IsActive: details.isActive,
                XCoordinate: latitude,
                YCoordinate: longitude,
                Name: refName.current.value,
                Email: refEmail.current.value,
                Phone: refPhone.current.value,
                lastShipment: details.lastShipment
            });
            setIsCorrect(true);
        }
        else {
            setIsCorrect(false);
           if(!isAddressValid) alert('בחר כתובת מהרשימה')
        }
    }
    useEffect(() => {
        if (isCorrect) {
            console.log(courier);
            dispatch(setDetails(courier))
                .then((response) => {
                    console.log("Response from addCourier:", response);
                })
                .catch((error) => {
                    console.error("Error adding courier:", error);
                });
        }
    }, [isCorrect]);
    return (
        <>
            <link href={css} rel="stylesheet" />
            <Logo />
            {!isCorrect && (
                <div className="container">
                    <form>
                        <div className="row">
                            <h3>פרטי שליח</h3>
                            <label htmlFor='id'><i className="fa fa-envelope"></i> {details.idCourier}:תעודת זהות</label>
                            <label htmlFor="name"><i className="fa fa-user"></i> שם מלא</label>
                            <input defaultValue={details.name} ref={refName} type="text" maxLength="25" id="fname" name="firstname" required />
                            {!isValidName && isConfirm && (
                                <span className="error-message">שם לא תקין</span>
                            )}
                            <label htmlFor="email"><i className="fa fa-envelope"></i> אימייל</label>
                            <input defaultValue={details.email} ref={refEmail} type="text" id="email" name="email" />
                            {!isValidEmail && isConfirm && (
                                <span className="error-message">אימייל לא תקין</span>
                            )}
                            <label><i className="fa fa-envelope"></i> טלפון</label>
                            <input defaultValue={details.phone} ref={refPhone} type="text" id="phone" name="phone" />
                            {!isValidPhoneNumber && isConfirm && (
                                <span className="error-message">מספר טלפון לא תקין</span>
                            )}
                            <label> כתובת</label>
                            <ChooseLocation address={details.address} />
                            <input className="btn" type='button' value={"אישור"} onClick={HandleConfirmation} />
                            <div className="row">
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isCorrect && (
                <div>
                    <h3>השינוים נשמרו </h3>
                    <p>פרטייך נשמרו במערכת,ניתן לשנותם באיזור האישי</p>
                    <p>בכל שעה שתרצה ניתן להכנס לאיזור האישי ולצפות במשלוחים באזורך</p>
                </div>
            )}
        </>
    );
}

export default SetCourierDetails;