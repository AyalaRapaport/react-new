import { useEffect, useRef, useState } from "react";
import css from '../Css/PersonalArea.css'
import Delivers from "./delivers";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const PersonalArea = () => {
    let refId = useRef();
    const nav = useNavigate();
    const [isCourier, setIsCourier] = useState(false);
    const [alignment, setAlignment] = useState('web');
    const [registered, setRegistered] = useState(true);
    useEffect((text) => {
        axios.get('https://localhost:7229/api/Courier')
            .then((response) => {
                console.log("succeed");
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });


    }, [])
    const Enter = (refId) => {
        console.log(refId);
        axios.get(`https://localhost:7229/api/Courier/${refId}`)
            .then((res) => {
                console.log(res);
                if (res.data) {
                    setIsCourier(true);
                    nav('/delivers/' + false)
                }
                else {
                    setRegistered(false);
                }

            })
            .catch((err) => {
                setRegistered(false);
                console.log(err);
            })
    }
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };


    return (
        <>
            <link href={css} rel="stylesheet" />
            <Logo />
            {/* <div className="ToggleButtonGroup"> */}
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton sx={{
                    color: 'primary.main', // צבע המלל
                    fontSize: '1.2rem', // גודל המלל
                    width: '150px', // רוחב הכפתור
                }} value="משתמש">משתמש</ToggleButton>
                <ToggleButton sx={{
                    color: 'primary.main', // צבע המלל
                    fontSize: '1.2rem', // גודל המלל
                    width: '150px', // רוחב הכפתור
                }} value="שליח">שליח</ToggleButton>
            </ToggleButtonGroup>
            {/* </div> */}
            <div id="login">
                <label id="labelId" htmlFor='id' ><i className="fa fa-envelope"></i> הקש מספר תעודת זהות</label>
                <input ref={refId} type="text" id="inputId" name="id" placeholder="123456789" />
                <button onClick={() => Enter(refId.current.value)}>הכנס</button>
            </div>
            {!registered && <>

                <p>אינך רשום כשליח</p>
                <button onClick={() => { nav('/courierDetails/') }}>להרשמה</button>
            </>
            }
        </>
    );
}

export default PersonalArea;