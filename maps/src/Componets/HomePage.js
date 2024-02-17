import React from 'react';
import Logo from './Logo';
import css from '../Css/HomePage.css'
import background from '../Assets/Images/1.jpg'
import { Link } from 'react-router-dom';
import Products from './products';
import Categories from './Categories';
const HomePage = () => {
    return (<>
        <link href={css} rel="stylesheet" />
        <Logo />
        <Link to={'/signIn'}> <button id='enterBtn'>כניסה לאיזור האישי</button></Link>
        <Link to={'/courierDetails'}> <button id='toCourierBtn'>הצטרפות לשליחים  </button></Link>
        <div id='back'>
        <img alt='background' id='background' src={background} /></div>
        {/* <Categories/> */}
        <Products/>
    </>);
}

export default HomePage;