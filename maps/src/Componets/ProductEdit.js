import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deletePro, getProduct, updateProduct } from '../Redux/productSlice';
import Logo from './Logo';
import CloseIcon from '@mui/icons-material/Close';
import {  editProductInStore } from '../Redux/storeSlice';

export default function ProductEdit({ id, edit, handleClose }) {
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState(null);
    const [isOk, setIsOk] = useState(true);
    const [open, setOpen] = useState(edit);
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState(null);
    const [toUpdate, setToUpdate] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const categories = useSelector(state => state.categories.categories);
    const [currProduct, setCurrProduct] = useState({
        Id: id,
        Name: '',
        Price: 0,
        Description: '',
        CategoryId: 0,
        StoreId: 0,
        Image: '',
    });

    useEffect(() => {
        setProduct(products.find(product => product.id === id));
    }, [products]);

    useEffect(() => {
        setOpen(edit);
    }, [edit]);

    useEffect(() => {
        dispatch(getProduct())
    }, []);

    useEffect(() => {
        if (product) {
            console.log(product);
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setImg(product.imgFile);
            setCategoryId(product.categoryId);
            console.log(product.categoryId);
        }
    }, [product]);

    const deleteProduct = () => {
        dispatch(deletePro(id))
        handleClose();
    }
    const handleSave = (e) => {
        e.preventDefault();
        if (!isOk) {
            alert('יש למלא את כל השדות בצורה תקינה');
            return;
        }
        else {
            console.log("ok");
            setCurrProduct({
                Id: id,
                Name: name,
                Price: price,
                Description: description,
                CategoryId: categoryId,
                StoreId: product.storeId,
                Image: file ? file.get('Image') : img
            });
            setToUpdate(true);
        }

    };

    useEffect(() => {
        if (toUpdate) {
            dispatch(updateProduct(currProduct))
            handleClose();
        }
    }, [toUpdate]);

    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append('Image', selectedFile);
        setFile(formData);
        // const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value);
    };

    return (
        <>
            <Logo />
            <Dialog open={open} onClose={handleClose} sx={{ maxHeight: '120vh' }} scroll='paper'>
                <DialogTitle>
                    עריכת פרטי מוצר
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="שם"
                            InputLabelProps={{
                                style: { fontSize: '1rem' }
                            }}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setIsOk(e.target.value?.trim() !== '');
                            }}
                            error={name?.trim() === ''}
                            helperText={name?.trim() === '' ? 'שדה חובה' : ''}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="תיאור מוצר"
                            value={description}
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
                            label="מחיר"
                            type="number"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setIsOk(e.target.value.trim() !== '');
                            }}
                        />
                    </div>
                    <label htmlFor="category"> :בחר קטגוריה</label>
                    <br />
                    <select id="category" value={categoryId} onChange={handleCategoryChange}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <div style={{ marginBottom: '10px' }}>
                        <Input
                            label="תמונה"
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
                        <br />
                        <button onClick={() => document.getElementById('image-upload').click()}> בחירה</button>
                        <label htmlFor="image-upload"> : תמונה</label>
                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                        )}
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        שמור
                    </Button>
                    <Button onClick={deleteProduct} color="primary">מחק מוצר </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
