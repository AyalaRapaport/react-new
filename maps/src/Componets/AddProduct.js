import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../Redux/productSlice';
import Logo from './Logo';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';

export default function AddProduct() {
    const idStore=useParams();
    console.log(idStore);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    // const [img, setImg] = useState(null);
    const [isOk, setIsOk] = useState(false);
    const [file, setFile] = useState(null);
    const [toAdd, setToAdd] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [categoryId, setCategoryId] = useState(1);
    const categories = useSelector(state => state.categories.categories); 
    const [currProduct, setCurrProduct] = useState({
        Name: '',
        Price: 0,
        Description: '',
        CategoryId: 0,
        StoreId: 0,
        Image: '',
    });

    const handleSave = (e) => {
        e.preventDefault();
        if (!isOk || file == null || price < 1) {
            alert('יש למלא את כל השדות בצורה תקינה');
            return;
        }
        else {
            console.log("ok");
            setCurrProduct({
                Name: name,
                Price: price,
                Description: description,
                CategoryId: +categoryId,
                StoreId: idStore,
                Image: file.get('Image')
            });
            setToAdd(true);
        }

    };

    useEffect(() => {
        if (toAdd) {
            console.log(idStore);
            dispatch(addProduct(currProduct))
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
    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
    };

    return (
        <>
            <Logo />
            <Dialog open={'true'} onClose={handleClose} sx={{ maxHeight: '120vh' }} scroll='paper'>
                <DialogTitle>
                    הוספת מוצר
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
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="תיאור מוצר" value={description}                          
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setIsOk(e.target.value?.trim() !== '');
                            }}
                            error={description?.trim() === ''}
                            helperText={description?.trim() === '' ? 'שדה חובה' : ''}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            inputProps={{ min: 0 }}
                            label="מחיר"
                            type="number"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setIsOk(e.target.value.trim() !== '');
                            }}
                        />
                    </div>
                    <label htmlFor="category">בחר קטגוריה:</label>
                    <br />
                    <select id="category" value={categoryId} onChange={handleCategoryChange}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <div >
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
                        <Button onClick={() => document.getElementById('image-upload').click()}> הוסף תמונה</Button>
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                        )}
                    </div>
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
