import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import css from '../Css/HomePage.css'
import background from '../Assets/Images/1.jpg'
import { Link } from 'react-router-dom';
import Categories from './Categories';
import Stores from './Stores';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import CustomAlert from './Alert';
import Navbar from './Navbar';
const HomePage = () => {
    // const [showCart, setShowCart] = useState(false);
    // const [showButton, setShowButton] = useState(false);

    // const inCart = useSelector(state => state.inCart.inCart);

    // useEffect(() => {
    //     if (inCart?.length > 0) {
    //         setShowButton(true);
    //     }
    // }, [inCart])

    return (<>
        <link href={css} rel="stylesheet" />
        {/* <Logo />
        <Link to={'/signIn'}> <button id='enterBtn'>כניסה לאיזור האישי</button></Link>
        <Link to={'/courierDetails'}> <button id='toCourierBtn'>הצטרפות לשליחים  </button></Link>
        {showButton && <button onClick={()=>{setShowCart(true)}} id='showCart' >לצפייה בהזמנה </button> }
        {showCart&&<Cart/>} */}
        <Navbar/>
        <div id='back'>
            <img alt='background' id='background' src={background} /></div>
        <Stores />
        <Categories />
        {/* <Products/> */}
    </>);
}

export default HomePage;