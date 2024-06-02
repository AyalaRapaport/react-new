import React, { useEffect, useState } from 'react';
import '../Css/Products.scss';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductEdit from './ProductEdit'
import { addProductToCart } from '../Redux/cartSlice';
import { Button, TextField } from '@mui/material';
import CustomAlert from './Alert';
import Navbar from './Navbar';

export default function Products() {
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const inCart = useSelector(state => state.inCart.inCart);
    const theme = useTheme();
    const [currentId, setCurrentId] = useState(-1);
    const products = useSelector(state => id ? state.stores.productLists[id] : []);
    const stores = useSelector(state => state.stores.stores);
    const [showAlert, setShowAlert] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [password, setPassword] = useState('');
    const [isManager, setIsManager] = useState(false);

    const handleEdit = (productId) => {
        setEdit(true);
        setCurrentId(productId)
    };

    useEffect(() => {
        console.log("products");
        console.log(products);
    }, [products])
    const handleClose = () => { setEdit(false); };

    const handleSave = () => { handleClose(); };

    const handleSubmit = () => {
        stores.forEach(store => {
            if (store.id == id && store.password === password) {
                setIsManager(true);
            }
        });
    };

    const addToCart = (product) => {
        if (!inCart[0] || inCart[0].storeId === product.storeId) {
            dispatch(addProductToCart(product));
        }
        else {
            console.log("alert");
            setShowAlert(true);
        }
    }

    return (
        <>
            <Navbar />
            {showAlert && <CustomAlert />}
            {!isManager && <Button onClick={() => setShowPass(true)} >כניסת מנהל</Button>}
            {showPass && !isManager && <div>
                <TextField label="סיסמה" type="password" variant="outlined" onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={() => handleSubmit()} type="submit">כניסה</Button>
            </div>}
            {isManager && <Button onClick={() => { nav('/addProduct/' + id) }}>הוספת מוצר</Button>}

            <div className='product'>
                {Array.isArray(products) && products.length > 0 && products?.map(product => (
                    <div className='mycard' key={product.id}>
                        <button onClick={() => { addToCart(product) }} className='plus'> +</button>
                        <CardMedia
                            className='productImg'
                            component="img"
                            image={product.urlImage}
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
                            {isManager && <Button onClick={() => handleEdit(product.id)}>עריכה</Button>}

                        </CardContent>
                    </div>
                ))
                }
                {edit && <ProductEdit id={currentId} edit={edit} handleClose={handleClose} handleSave={handleSave} />}
            </div >
        </>

    );
}
