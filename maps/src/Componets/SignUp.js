import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from './Logo';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ChooseLocation from './ChooseLocation';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Redux/userSlice';


const SignIn = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);  let apiKey = 'AIzaSyBNVjEXhyDOUvcCECJFY5x_OGKt38dxVBk';
  const[isOk,setisOk]=useState(false);
  const dispatch=useDispatch();
  const address = useSelector(state => state.addresses.address);
  const [user, setUser] = useState({
    idUser: "",
    XCoordinate: 0,
    YCoordinate: 0,
    Name: "",
    Email: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUser({
      idUser: data.get('id'),
      XCoordinate: latitude,
      YCoordinate: longitude,
      Name: data.get('name'),
      Email: data.get('email'),
    });
   setisOk(true);
  }

  useEffect(()=>{
    if(isOk){
      console.log(user);
      dispatch(addUser(user));
    }
  },[isOk])

  useEffect(() => {
    console.log("aaa"+ address);
    const getAddressCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
        );
        const { lat, lng } = response.data.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        console.log("address" + lat, lng);
      } catch (error) {
        console.error("Error getting coordinates:", error);
      }
    };
    getAddressCoordinates();
  }, [address]);

  const defaultTheme = createTheme();
  return (
    <>
      <Logo />
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
              woltהצטרפות ל
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="id"
                label="id"
                type="id"
                id="id"
                autoComplete="current-password"
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="address"
                label="address"
                type="address"
                id="address"
                autoComplete="current-password"
              /> */}
              <ChooseLocation address=''/>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                autoComplete="name"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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

export default SignIn