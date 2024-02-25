import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { removeProducts } from '../Redux/cartSlice';

function CustomAlert() {

    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };

    const remove = () => {
        dispatch(removeProducts());
        handleClose();
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        לא ניתן להזמין מוצרים מחנויות שונות בהזמנה אחת
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>remove()} color="primary">
                        הסרת מוצרים קודמים
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomAlert;
