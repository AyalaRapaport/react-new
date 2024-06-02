import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailsById } from '../Redux/courierSlice';
import { getUserDetailsById } from '../Redux/userSlice';

const defaultTheme = createTheme();

export default function SignIn() {
  const [alignment, setAlignment] = React.useState('משתמש');
  const nav = useNavigate();
  // const details = useSelector(state => id ? state.couriers.details[id] : []);
  const dispatch = useDispatch();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get('id');
    const password = data.get('password');
    if (alignment === 'שליח') {
      dispatch(getDetailsById(id))
        .then((res) => {
          if (res.payload) {
            if (!(res.payload.password == password))
              alert('ססמא שגויה')
            else
              nav('/delivers');
          }
          else alert('אינך רשום כשליח');
        })
        .catch(() => {
          alert('אינך רשום כשליח');
        });
    }
    else {
      dispatch(getUserDetailsById(data.get('id')))
        .then((res) => {
          if (res.payload) {
            if (!(res.payload.password === password))
              alert('ססמא שגויה')
            else
              nav('/homepage')
          }
          else alert('אינך רשום');
        })
        .catch(() => {
          alert('אינך רשום');
        })
    }
  };

  return (
    <>
      <Logo />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        sx={{ display: 'flex', justifyContent: 'center' }}
        defaultValue="משתמש"
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
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#00c4e7' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              התחברות
            </Typography>
            <Box component="form" onSubmit={HandleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="id"
                label="תעודת זהות"
                type="id"
                id="id"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="הקש ססמא"
                name="password"
                autoComplete="password"
              />


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#00c4e7' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  {alignment === 'משתמש' && <Link to='/signUp'>הרשמה</Link>}
                  {alignment === 'שליח' && <Link to='/courierDetails'>הצטרפות לשליחים</Link>}
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}
