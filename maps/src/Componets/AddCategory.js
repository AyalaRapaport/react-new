import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, IconButton } from '@mui/material';
import { useDispatch, } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from './Navbar';
import { addCategory } from '../Redux/categorySlice';

export default function AddCategory() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [isOk, setIsOk] = useState(false);
    const [file, setFile] = useState(null);
    const [toAdd, setToAdd] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currCategory, setCurrCategory] = useState({
        Name: '',
        Image: '',
    });

    const handleSave = (e) => {
        e.preventDefault();
        if (!isOk || file == null ) {
            alert('יש למלא את כל השדות בצורה תקינה');
            return;
        }
        else {
            console.log("ok");
            setCurrCategory({
                Name: name,
                Image: file.get('Image')
            });
            setToAdd(true);
        }

    };

    useEffect(() => {
        if (toAdd) {
            dispatch(addCategory(currCategory))
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
    

    return (
        <>
            <Navbar />
            <Dialog open={'true'} onClose={handleClose} sx={{ maxHeight: '120vh' }} scroll='paper'>
                <DialogTitle>
                    הוספת קטגוריה
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
                    </div>

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
            </Dialog>
        </>
    );
}
