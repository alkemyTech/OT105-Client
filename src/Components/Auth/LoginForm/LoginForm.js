import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import {
  containsSixCharacters,
  containsOneNumber,
  containSpecialCharacter,
  containsOneLetter,
  validEmail,
} from '../../../Utils/Validations/userValidations';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import '../../FormStyles.css';
import Swal from 'sweetalert2';

const validate = (values) => {
  let errors = {};

  if (!values.password) {
    errors.password = 'required!';
  } else if (containsSixCharacters(values.password)) {
    errors.password = 'at least 6 characters';
  } else if (!containsOneNumber(values.password)) {
    errors.password = 'at least 1 number';
  } else if (!containSpecialCharacter(values.password)) {
    errors.password = 'at least 1 special character';
  } else if (!containsOneLetter(values.password)) {
    errors.password = 'at least 1 letter';
  }
  if (!values.email) {
    errors.email = 'required!';
  } else if (!validEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const LoginForm = () => {
  const [userValues, setUserValues] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const SignupForm = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validate,
      onSubmit: (values) => {
        setUserValues({
          ...userValues,
          email: values.email,
          password: values.password,
        });

        if (
          values.email === 'user@user.com' &&
          values.password === 'user@1234'
        ) {
          localStorage.setItem('token', 1);
          Swal.fire({
            icon: 'success',
            text: 'Logeado como usuario regular',
          });
          history.push('/');

          return;
        }
        if (
          values.email === 'admin@admin.com' &&
          values.password === 'admin@1234'
        ) {
          localStorage.setItem('token', 2);
          Swal.fire({
            icon: 'success',
            text: 'Logeado como administrador',
          });
          history.push('/');

          return;
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Email y/o contraseña incorrectos',
          });
          setUserValues({ email: '', password: '' });

          return;
        }
      },
    });
    const showErrors = (errorAttribute) => {
      if (formik.touched[errorAttribute] && formik.errors[errorAttribute]) {
        return (
          <Alert align="justify" severity="warning" sx={{ width: '23rem' }}>
            <AlertTitle> Warning </AlertTitle>
            {formik.errors[errorAttribute]}
          </Alert>
        );
      }
    };

    return (
      <>
        {localStorage.getItem('token') && <Redirect to="/" />}
        <form className="login-user-form" onSubmit={formik.handleSubmit}>
          <FormControl margin="dense" sx={{ width: '25rem' }}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              margin="dense"
              name="email"
              placeholder="Email"
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              }
              type="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {showErrors('email')}
          </FormControl>
          <FormControl sx={{ width: '25rem' }}>
            <InputLabel htmlFor="password">password</InputLabel>
            <Input
              id="password"
              margin="dense"
              name="password"
              placeholder="password"
              startAdornment={
                <InputAdornment position="start">
                  <VisibilityOutlinedIcon />
                </InputAdornment>
              }
              type="password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {showErrors('password')}
          </FormControl>
          <Button className="submit-btn" type="submit" variant="contained">
            Login
          </Button>
        </form>
      </>
    );
  };

  return (
    <Container maxWidth="sm">
      <SignupForm />
    </Container>
  );
};

export default LoginForm;
