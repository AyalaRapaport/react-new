import { Link, useLocation } from 'react-router-dom';
import logo from '../Assets/Images/logo.png';
import css from '../Css/Logo.css';
const Logo = () => {
    const location = useLocation();
    return (
        <>
            <link href={css} rel="stylesheet" />
            {location.pathname !== '/homePage' && (
                <Link to={'/homePage'}><img id='logo' src={logo} alt="Logo" /></Link>
            )}
            {location.pathname==='/homePage' &&(
                <img id='logo' src={logo} alt="Logo" />
            )}
        </>


    );
}

export default Logo;