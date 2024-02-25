import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import Logo from './Logo';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
    const inCart = useSelector(state => state.inCart.inCart);
    const handleClose = () => {
        window.history.back();
    }

    const handleSave = () => {
        // Add functionality for saving the order here
    }

    return (
        <>
            <Logo />
            <Dialog open onClose={handleClose} sx={{
                display: 'flex', flexDirection: 'row'
                , alignItems: 'flex-start', width: '40vw', minWidth: '40vw', height: '100vh',
                minHeight: '100vh', justifyContent: 'flex-start', transition: 'transform 2.5s ease'
                , transform: 'translateX(0)'
            }}>
                <DialogTitle>
                    ההזמנה שלך
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
                    {inCart?.map((item) => (
                        <div key={item.id} style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '16px', flexDirection: 'row' }}>
                            <CardMedia
                                component="img"
                                image={item.imgFile}
                                alt={item.name}
                                style={{ width: '20%', height: '15vh', objectFit: 'cover', marginRight: '16px', float: 'right' }}
                            />
                            <CardContent style={{ width: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ₪ {item.price}
                                </Typography>
                            </CardContent>
                        </div>

                    ))}
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        אישור הזמנה
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}

export default Cart;
