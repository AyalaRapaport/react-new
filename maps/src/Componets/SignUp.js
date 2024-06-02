import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, getUserDetailsById } from '../Redux/userSlice';
import { StandaloneSearchBox } from '@react-google-maps/api';
import Navbar from './Navbar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const apiKey = useSelector(state => state.addresses.apiKey);
  const [isOk, setisOk] = useState(false);
  const searchBox = React.useRef(null);
  const dispatch = useDispatch();
  const inputRef = React.useRef('');
  const nav = useNavigate();
  const [user, setUser] = useState({
    idUser: "",
    XCoordinate: 0,
    YCoordinate: 0,
    Name: "",
    Email: "",
    Password: ""
  });
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, ' !קצר מידי')
      .max(50, ' !ארוך מדי')
      .required('שדה חובה')
      .matches(
        /^[א-תa-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ),
    password: Yup.string().min(2, ' !קצר מידי').required('שדה חובה'),
    email: Yup.string().email(' אימייל לא תקין').required('שדה חובה'),
    id: Yup.string()
      .min(9, 'הקש 9 תווים')
      .max(9, 'הקש 9 תווים')
      .required('שדה חובה'),
  });

  const handleSubmit = (value) => {
    if (latitude && longitude) {
      setUser({
        idUser: value.id,
        XCoordinate: latitude,
        YCoordinate: longitude,
        Name: value.name,
        Email: value.email,
        Password: value.password
      });
      setisOk(true);
    }
    else {
      alert("כתובת אינה תקינה");
      setisOk(false);
    }
  }

  useEffect(() => {
    if (isOk) {
      dispatch(addUser(user)).then((response) => {
        if (response.payload === true) {
          alert('משתמש כבר קיים');
          setisOk(false);
        }
        else {
          dispatch(getUserDetailsById(user.idUser));
          nav('/homePage');
        }
      });
    }
  }, [isOk]);


  const checkAddress = async (inputRef) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${inputRef}&key=${apiKey}`
      );
      if (response.data.results[0]) {
        const { lat, lng } = response.data.results[0].geometry.location;
        if (lat && lng) {
          if (lat > 29.3 && lat < 33.7 && lng > 33.5 && lng < 36.3) {
            console.log(lat, lng);
            setLatitude(lat);
            setLongitude(lng);
          }
          else {
            alert('בחר כתובת בישראל');
            setLatitude(0);
            setLongitude(0);
          }
        }
      }
    }
    catch (error) {
      alert('בחר כתובת קיימת מישראל');
      console.error("Error getting coordinates:", error);
    }
  }

  const defaultTheme = createTheme();
  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Formik
            initialValues={{
              email: '',
              id: '',
              name: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={(values,) => {
              handleSubmit(values);
            }}

          >
            {formik => (
              <Form>
                <TextField margin="normal" fullWidth id="email" label="אימייל " name="email" autoComplete="email"
                  {...formik.getFieldProps('email')} error={formik.errors.email} helperText={formik.touched.email && formik.errors.email}
                />
                <TextField margin="normal" fullWidth name="id" label="תעודת זהות" type="text" id="id"
                  {...formik.getFieldProps('id')} error={formik.touched.id && formik.errors.id} helperText={formik.touched.id && formik.errors.id}
                />
                <TextField margin="normal" fullWidth id="password" label="password " type='password' name="password" autoComplete="password"
                  {...formik.getFieldProps('password')} error={formik.errors.password} helperText={formik.touched.password && formik.errors.password}
                />
               
                <StandaloneSearchBox
                  onLoad={(ref) => (searchBox.current = ref)}
                >
                  <input onBlur={() => checkAddress(inputRef.current.value)} className="inpSearch" ref={inputRef} type="text" placeholder="בחר כתובת" autoComplete="on" name='address'
                  // {...formik.getFieldProps('name')} error={formik.touched.address && formik.errors.address} helperText={formik.touched.address && formik.errors.address}
                  />
                </StandaloneSearchBox>
                <TextField margin="normal" fullWidth name="name" label="name" type="name" id="name" autoComplete="name" {...formik.getFieldProps('name')} error={formik.touched.name && formik.errors.name} helperText={formik.touched.name && formik.errors.name}
                />
                <Button disabled={!formik.isValid} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#00c4e7' }}>
                  הרשמה </Button>

                <Grid container>
                  <Grid item xs></Grid>
                  <Grid item></Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SignUp