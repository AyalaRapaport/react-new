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
    const [img, setImg] = useState([]);
    const images = useSelector(state => state.products.images);
    useEffect(() => {
        dispatch(getProduct());
    }, [])

    // useEffect(() => {
    //     console.log(products.length);
    // }, [products])

    // useEffect(() => {
    //     if (images.length > 1) {
    //         console.log("0"+images[0]);
    //         console.log("1"+images[1]);
    //         console.log("2"+images[2]);
    //         console.log("3"+images[3]);

    //     }

    // }, [images]);

    useEffect(() => {
        if (products.length ===3) {
            products.forEach(product => {
                console.log(product.urlImage);
                dispatch(getImage(product.urlImage))
                // .then((img1) => {
                //     console.log(images);
                // }).catch((error) => {
                //     console.error(error);
                // });
            });
        }
    }, [products]);

    return (
        <div className='product'>
            {products&&products.map(product => (
                <div className='mycard' key={product.id}>
                    <button className='plus'> +</button>
                    {<CardMedia
                        className='productImg'
                        component="img"
                        // image={product.imageUrl} // אנו משתמשים ב-URL של התמונה שנמצא במשתנה imageUrl
                        image={images[product.id+1]}
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
