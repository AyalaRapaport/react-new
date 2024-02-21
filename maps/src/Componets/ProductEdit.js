import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../Redux/productSlice';
import Logo from './Logo';
import CloseIcon from '@mui/icons-material/Close';

export default function ProductEdit({ id, edit, handleClose }) {
    const product = useSelector(state => state.products.product);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isOk, setIsOk] = useState(false);
    const [open, setOpen] = useState(edit);
    const [file, setFile] = useState(null);
    // const [imgName, setImgName] = useState('');
    const [toUpdate, setToUpdate] = useState(false);
    const [currProduct, setCurrProduct] = useState({
        Id: id,
        Name: '',
        Price: 0,
        Description: '',
        CategoryId: 0,
        StoreId: 0,
        Image: '',
        // UrlImage: ''
    });

    useEffect(() => {
        setOpen(edit);
    }, [edit]);

    useEffect(() => {
        dispatch(getProductById(id))
    }, [id]);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
        }
    }, [product]);

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
                CategoryId: 1,
                StoreId: 1,
                Image: file.get('Image') 
                // UrlImage: imgName
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
                            label="Name"
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
                            label="Description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setIsOk(e.target.value?.trim() !== '');
                            }}
                            error={description?.trim() === ''}
                            helperText={description?.trim() === '' ? 'שדה חובה' : ''} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="Price"
                            type="number"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                setIsOk(e.target.value.trim() !== '');
                            }}
                        // error={price?.trim() === ''}
                        // helperText={price?.trim() === '' ? 'שדה חובה' : ''
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label htmlFor="image-upload"> תמונה </label>
                        <br />
                        <Input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            sx={{
                                height: "100px",
                                bgcolor: "transparent",
                            }}
                            id="image-upload"
                        />
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
