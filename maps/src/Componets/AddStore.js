import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, IconButton } from '@mui/material';
import { useDispatch, useSelector, } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from './Navbar';
import { addCategory } from '../Redux/categorySlice';
import axios from 'axios';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { addstore } from '../Redux/storeSlice';

export default function AddStore() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isOk, setIsOk] = useState(false);
    const [file, setFile] = useState(null);
    const [toAdd, setToAdd] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const inputRef = useRef('');
    const apiKey = useSelector(state => state.addresses.apiKey);
    const searchBox = useRef(null);
    const [currStore, setCurrcurrStore] = useState({
        Name: '',
        XCoordinate: '',
        YCoordinate: '',
        Password: '',
        Image: '',

    });

    const handleSave = (e) => {
        e.preventDefault();
        if (!isOk || file == null) {
            alert('יש למלא את כל השדות בצורה תקינה');
            return;
        }
        else {
            console.log("ok");
            setCurrcurrStore({
                Name: name,
                XCoordinate:latitude,
                YCoordinate: longitude,
                Password: password,
                Image: file.get('Image')
            });
            setToAdd(true);
        }

    };

    useEffect(() => {
        if (toAdd) {
            dispatch(addstore(currStore))
            handleClose();
        }
    }, [toAdd]);

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append('Image', selectedFile);
        setFile(formData);
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleClose = () => {
        window.history.back();
    }
    const checkAddress = async (inputRef) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${inputRef}&key=${apiKey}`
            );
            if (response.data.results[0]) {
                const { lat, lng } = response.data.results[0].geometry.location;
                if (lat && lng) {
                    // if (lat > 33.7 && lat < 36.3 && lng > 29.3 && lng < 33.5) {
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
            <Navbar />
            {/* <Dialog open={'true'} onClose={handleClose} sx={{ maxHeight: '120vh' }} scroll='paper'> */}
                <DialogTitle>
                    הוספת חנות
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="שם" InputLabelProps={{
                                style: { fontSize: '1rem' }
                            }}
                            value={name} onChange={(e) => {
                                setName(e.target.value);
                                setIsOk(e.target.value?.trim() !== '');
                            }}
                            error={name?.trim() === ''}
                            helperText={name?.trim() === '' ? 'שדה חובה' : ''}
                        />
                        <TextField
                            label="ססמא" InputLabelProps={{
                                style: { fontSize: '1rem' }
                            }}
                            value={password} onChange={(e) => {
                                setPassword(e.target.value);
                                setIsOk(e.target.value?.trim() !== '');
                            }}
                            error={password?.trim() === ''}
                            helperText={password?.trim() === '' ? 'שדה חובה' : ''}
                        />
                    </div>
                    <StandaloneSearchBox
                        onLoad={(ref) => (searchBox.current = ref)}
                    >
                        <input onBlur={() => checkAddress(inputRef.current.value)} className="inpSearch" ref={inputRef} type="text" placeholder="בחר כתובת" autoComplete="on" name='address'
                        />
                    </StandaloneSearchBox>
                    <label htmlFor="image-upload"> :בחר תמונה</label>
                    <br />
                    <Input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                        accept="image/*"
                        sx={{
                            height: "100px",
                            bgcolor: "transparent",
                        }}
                        id="image-upload"
                    />
                    <button onClick={() => document.getElementById('image-upload').click()}>Add Image</button>
                    {selectedImage && (
                        <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        שמור
                    </Button>
                </DialogActions>
            {/* </Dialog> */}
        </>
    );
}
