import React, { useEffect, useState } from 'react';
import '../Css/Products.scss';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getImage, getProduct } from '../Redux/productSlice';
import ProductEdit from './ProductEdit'

export default function Products() {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const theme = useTheme();
    const nav = useNavigate();
    const images = useSelector(state => state.products.images);
    const [currentId, setCurrentId] = useState(-1);
    let i=0;

    useEffect(() => {
        dispatch(getProduct());
    }, [])


    useEffect(() => {
        if (Array.isArray(products)) {
            products.forEach(async product => {
              dispatch(getImage(product));

            });
        }
    }, [products]);

    const handleEdit = (productId) => {
        setEdit(true);
        setCurrentId(productId)
    };

    const handleClose = () => {
        setEdit(false);
    };

    const handleSave = () => {
        handleClose(); 
    };
    return (
        <div className='product'>
            {Array.isArray(products)&&products.length>0&& products?.map(product => (
                <div className='mycard' key={product.id}>
                    <button className='plus'> +</button>
                    <CardMedia
                        className='productImg'
                        component="img"
                        image={images?.find(x=>x.id===product.id)?.img}
                        alt={product.name}
                        style={{ width: '40%', height: '25vh', objectFit: 'cover' }}
                    />
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
                        {/* <button onClick={() => nav('/productEdit')}>edit</button> */}
                        <button onClick={() => handleEdit(product.id)}>edit</button>

                    </CardContent>
                </div>
            ))
            }
            {edit && <ProductEdit id={currentId} edit={edit} handleClose={handleClose} handleSave={handleSave} />}
        </div >
    );
}
