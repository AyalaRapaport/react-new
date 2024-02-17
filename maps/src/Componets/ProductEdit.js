import React, { useEffect, useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../Redux/productSlice';
import Logo from './Logo';

export default function ProductEdit() {
    const dispatch = useDispatch();
    const [name, setName] = useState('Product Name');
    const [description, setDescription] = useState('Product Description');
    const [price, setPrice] = useState(0);
    const products = useSelector(state => state.products.products);
    const handleSave = () => {
        // Handle saving the edited product details
    };
    useEffect(() => {
        dispatch(getProduct());
    }, [])
    useEffect(() => {
        products.map(product => {
            console.log("ID:", product.id);
            console.log("Name:", product.name);
            console.log("Price:", product.price);
            console.log("Description:", product.description);
            console.log(); 
        });   
    }, [products])

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        // Handle the selected image file here
        console.log(file);
    };

    return (
        <>
            <Logo />
            <Dialog open={true} onClose={handleSave}>
                <DialogTitle>Edit Product Details</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="image-upload"> תמונת פרופיל</label>
                    <Input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*" // Specify accepted file types (images in this case)
                        sx={{
                            height: "100px",
                            bgcolor: "transparent",
                        }} // Hide the default input style
                        id="image-upload" // Set a unique id for the input
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
