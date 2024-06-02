import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Navbar = () => {
    const [showCart, setShowCart] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const inCart = useSelector(state => state.inCart.inCart);
    const courier = useSelector(state => state.couriers.currentCourier)
    const nav = useNavigate();

    useEffect(() => {
        if (inCart?.length > 0) {
            setShowButton(true);
        }
    }, [inCart])

    const handleCloseCart = () => {
        setShowCart(false);
    }
    useEffect(() => {
        if (showCart)
            nav('/cart')

    }, [showCart])

    return (<div style={{ backgroundColor: 'rgb(209 215 217)', height: '13vb' }}>
        <Logo />
        <Link to={'/signIn'}> <button style={{ backgroundColor: 'transparent' }} id='enterBtn'>התחברות  </button></Link>
        {courier && <Link to={'/delivers'}> <button style={{ backgroundColor: 'transparent' }} id='enterBtn'>כניסה לאיזור האישי</button></Link> }
        <Link to={'/courierDetails'}> <button style={{ backgroundColor: 'transparent' }} id='toCourierBtn'>הצטרפות לשליחים  </button></Link>
        <Link to='/signUp'> <button style={{ backgroundColor: 'transparent' }} id='toCourierBtn'>הרשמה  </button></Link>
        {showButton && (
            <button style={{ backgroundColor: 'transparent', color: '#00c4e7' }} onClick={() => { setShowCart(true) }} id='showCart'>
                <span>
                    <ShoppingCartIcon />
                    {inCart.length}
                </span>
            </button>
        )}


        {/* {showCart&&<Cart onClose={handleCloseCart} open={showCart} />} */}
    </div>);
}

export default Navbar;