import { Link } from "react-router-dom";
import Cart from "./Cart";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [showCart, setShowCart] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const inCart = useSelector(state => state.inCart.inCart);

    useEffect(() => {
        if (inCart?.length > 0) {
            setShowButton(true);
        }
    }, [inCart])
    return (<div>
    <Logo />
        <Link to={'/signIn'}> <button id='enterBtn'>כניסה לאיזור האישי</button></Link>
        <Link to={'/courierDetails'}> <button id='toCourierBtn'>הצטרפות לשליחים  </button></Link>
        {showButton && <button onClick={()=>{setShowCart(true)}} id='showCart' >לצפייה בהזמנה </button> }
        {showCart&&<Cart/>}
    </div> );
}
 
export default Navbar;