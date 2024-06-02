import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CardMedia, CardContent, Typography, Grid, TextField, Input, FormGroup } from '@mui/material';
import Logo from './Logo';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../Redux/cartSlice';
import { StandaloneSearchBox } from '@react-google-maps/api';
import '../Css/Cart.css'
import axios from 'axios';
import { addOrder } from '../Redux/orderSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const nav = useNavigate()
    const [latitude, setLatitude] = useState(1);
    const [longitude, setLongitude] = useState(1);
    const inCart = useSelector(state => state.inCart.inCart);
    const details = useSelector(state => state.users.currentUser);
    const dispatch = useDispatch();
    const searchBox = useRef();
    const inputRef = useRef();
    const [ok, setOk] = useState(false);
    const [isSend, setIsSend] = useState(false);
    const apiKey = useSelector(state => state.addresses.apiKey);
    const stores = useSelector(state => state.stores?.stores);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [inCartProducts, setInCartProducts] = useState([]);
    const [order, setOrder] = useState({
        xCoordinate: 0,
        yCoordinate: 0,
        storeId: -1,
        orderDate: new Date().toISOString(),
        userId: 0,
        isTaken: false,
        isDone: false,
        products: []
    });


    useEffect(() => {
        if (inCart) {
            const productsIds = inCart.map(item => item.id);
            console.log(productsIds);
            setInCartProducts(productsIds);
        }
    }, [inCart]);

    useEffect(() => {
        if (ok) {
            dispatch(addOrder(order))
            setIsSend(true)
            alert('ההזמנה בדרך אליך')
            nav('/homePage')
        }
    }, [ok])

    const handleClose = () => {
        window.history.back();
    };

    const handleSave = () => {
        if (inCart.length < 1)
            alert('אין מוצרים בעגלה')
        const store = stores.find(store => store.id === inCart[0].storeId);
        const distance = calculateDistance({ lat: latitude, lng: longitude }, { xStore: store.xCoordinate, yStore: store.yCoordinate });
        if (distance > 15) {
            alert("החנות רחוקה מדי ולא ניתן להזמין לכתובת שנבחרה")
        }
        console.log(details);
        if (longitude && latitude && distance <= 15) {
            setOrder({
                xCoordinate: latitude,
                yCoordinate: longitude,
                storeId: inCart[0].storeId,
                orderDate: new Date().toISOString(),
                isTaken: false,
                isDone: false,
                userId: details.id,
                user: details,
                products: inCartProducts,
            })
            setOk(true);
        }
    }
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    }
    useEffect(() => {
        if (details) {
            setLatitude(details.xCoordinate);
            setLongitude(details.yCoordinate);
        }
    }, [details])

    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    function calculateDistance(location1, location2) {
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
        return distance;
    }


    const checkAddress = async (inputRef) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${inputRef}&key=${apiKey}`
            );
            if (response.data.results[0]) {
                console.log(inputRef);
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

    return (
        <>
            <Logo />
            {/* <Dialog open={open} sx={{
                display: 'flex', flexDirection: 'row'
                , alignItems: 'flex-start', width: '40vw', minWidth: '40vw', height: '100vh',
                minHeight: '100vh', justifyContent: 'flex-start', transition: 'transform 2.5s ease'
                , transform: 'translateX(0)'
            }}> */}
            <FormGroup sx={{
                display: 'flex', flexDirection: 'row'
                , alignItems: 'flex-start', width: '40vw', minWidth: '40vw', height: '100vh',
                minHeight: '100vh', justifyContent: 'flex-start', transition: 'transform 2.5s ease'
                , transform: 'translateX(0)'
            }}>
                <DialogTitle>
                    ההזמנה שלך
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
                    {inCart?.map((item) => (
                        <div key={item.id} style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '16px', flexDirection: 'row' }}>
                            <CardMedia
                                component="img"
                                image={item.urlImage}
                                alt={item.name}
                                style={{ width: '20%', height: '15vh', objectFit: 'cover', marginRight: '16px', float: 'right' }}
                            />
                            <CardContent style={{ width: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ₪ {item.price}
                                </Typography>
                            </CardContent>
                            <IconButton aria-label="מחק מוצר">
                                <DeleteIcon onClick={() => handleDelete(item.id)} />
                            </IconButton>
                        </div>

                    ))}

                    <TextField onChange={(event) => setName(event.target.value)} margin="normal" required id="name" label="שם" name="name" defaultValue={details?.name} autoComplete="name" />
                    <TextField onChange={(event) => setEmail(event.target.value)} margin="normal" required label="אימייל" defaultValue={details?.email} />

                    <StandaloneSearchBox style={{ position: 'relative', zIndex: 7 }} onLoad={(ref) => (searchBox.current = ref)} >
                        <input onBlur={() => checkAddress(inputRef.current.value)} defaultValue={details?.address} className="inpSearch" ref={inputRef}
                            type="text" placeholder="בחר כתובת" autoComplete="on"
                            style={{ zIndex: 1, position: 'relative', width: '100%' }}
                        />
                    </StandaloneSearchBox>
                </DialogContent>
                <DialogActions>
                    {details !== null ? (
                        <Button onClick={handleSave} color="primary">
                            אישור הזמנה
                        </Button>
                    ) : (
                        <p>כדי להמשיך, יש להירשם קודם</p>
                    )}
                </DialogActions>
            </FormGroup>
            {isSend && <p>ההזמנה נשלחה</p>}
        </>
    );
}

export default Cart;
