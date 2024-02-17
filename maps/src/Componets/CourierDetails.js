import { useEffect, useRef, useState } from 'react';
import css from '../Css/CourierDetails.css'
import Logo from './Logo';
import axios from 'axios';
import ChooseLocation from './ChooseLocation';
import { useDispatch, useSelector } from 'react-redux';
import { addCourier} from '../Redux/courierSlice';

const CourierDetails = () => {
    const refName = useRef();
    const refEmail = useRef();
    const refPhone = useRef();
    const refId = useRef();
    const address = useSelector(state => state.addresses.address);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidIsraeliId, setIsValidIsraeliId] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    // const details = useSelector(state => state.couriers.details);
    // const status = useSelector(state => state.couriers.status);
    const dispatch = useDispatch();
    let apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';
    const [courier, setCourier] = useState({
        IdCourier: "",
        IsActive: false,
        XCoordinate: 0,
        YCoordinate: 0,
        Name: "",
        Email: "",
        Phone: "",
        Date: ""
    });
    
    
    useEffect(() => {
        console.log("Redux state updated: ", address);
    }, [address]);

    useEffect(() => {
        const getAddressCoordinates = async () => {
            try {
                const response = await axios.get(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
                );
                const { lat, lng } = response.data.results[0].geometry.location;
                setLatitude(lat);
                setLongitude(lng);
                console.log("address" + lat, lng);
            } catch (error) {
                console.error("Error getting coordinates:", error);
            }
        };
        getAddressCoordinates();
    }, [address]);

    const HandleConfirmation = () => {
        const isNameValid = /^[A-Za-zא-ת\s]+$/u.test(refName.current.value) && refName.current.value.length > 1;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(refEmail.current.value);
        const isIsraeliIdValid = /^\d{9}$/.test(refId.current.value);
        const isPhoneNumberValid = /^\d{10}$/.test(refPhone.current.value);
        setIsConfirm(true);
        setIsValidName(isNameValid);
        setIsValidEmail(isEmailValid);
        setIsValidIsraeliId(isIsraeliIdValid);
        setIsValidPhoneNumber(isPhoneNumberValid);

        if (isNameValid && isEmailValid && isIsraeliIdValid && isPhoneNumberValid) {
            setCourier({
                IdCourier: refId.current.value,
                IsActive: false,
                XCoordinate: longitude,
                YCoordinate: latitude,
                Name: refName.current.value,
                Email: refEmail.current.value,
                Phone: refPhone.current.value,
                lastShipment: new Date().toISOString()
            });
            setIsCorrect(true);
        }
        else {
            setIsCorrect(false);
        }
    }
    useEffect(() => {
        if (isCorrect) {
            console.log( courier);
            // if(!dispatch(getDetails(courier.IdCourier)))
            {dispatch(addCourier(courier))
                .then((response) => {
                    console.log("Response from addCourier:", response);
                    setIsCorrect(true);
                })
                .catch((error) => {
                    console.error("Error adding courier:", error);
                    setIsCorrect(false);
                });}
                // else
                // console.log("שליח כבר קיים");
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
                            <label> כתובת</label>
                            <ChooseLocation address={address} />
                            <input className="btn" type='button' value={"אישור"} onClick={HandleConfirmation} />
                            <div className="row">
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isCorrect && (
                <div>
                    <h3> wolt מזל טוב!! הצטרפת ל</h3>
                    <p>פרטייך נשמרו במערכת,ניתן לשנותם באיזור האישי</p>
                    <p>בכל שעה שתרצה ניתן להכנס לאיזור האישי ולצפות במשלוחים באזורך</p>
                </div>
            )}
        </>
    );
}

export default CourierDetails;
