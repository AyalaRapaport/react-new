import React, { useEffect, useState } from 'react';
import '../Css/Products.scss';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getImage, getProduct } from '../Redux/productSlice';

export default function Products() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const theme = useTheme();
    const nav = useNavigate();
    // const [img, setImg] = useState([]);
    const images = useSelector(state => state.products.images);
    useEffect(() => {
        dispatch(getProduct());
    }, [])

    const [hasLoadedImages, setHasLoadedImages] = useState(false);

    useEffect(() => {
        if (products.length === 3 && !hasLoadedImages) {
            setHasLoadedImages(true);
            products.forEach(product => {
                dispatch(getImage(product.urlImage));
            });
        }
    }, [products, hasLoadedImages]);


    return (
        <div className='product'>
            {products.length===3 &&images.length>2&& products.map(product => (
                <div className='mycard' key={product.id}>
                    <button className='plus'> +</button>
                    {<CardMedia
                        className='productImg'
                        component="img"
                        image={images[product.id-1]}
                        alt={product.name}
                        style={{ width: '40%', height: '25vh', objectFit: 'cover' }}
                    />}
                    <CardContent style={{ width: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        </div>
                        <div>
                            <Typography style={{ color: theme.palette.primary.main }} variant="body2" color="text.secondary">
                                ₪ ‏{product.price}
                            </Typography>
                        </div>
                        <button onClick={() => nav('/productEdit')}>edit</button>
                    </CardContent>
                </div>
            ))}
        </div>
    );
}
