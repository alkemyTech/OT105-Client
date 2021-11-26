import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import '../FormStyles.css';

const LoginForm = () => {
  const [userValues, setUserValues] = useState({
    email: '',
    password: '',
  });
  const SignupForm = () => {
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      //validate,
      onSubmit: (values) => {
        setUserValues({
          ...userValues,
          email: values.email,
          password: values.password,
        });
        console.log(userValues);
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
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
          {formik.touched.email && formik.errors.email ? (
            <Alert align="justify" severity="warning" sx={{ width: '23rem' }}>
              <AlertTitle> Warning </AlertTitle>
              {formik.errors.email}
            </Alert>
          ) : null}
        </FormControl>
        <br />
        <br />
        <FormControl margin="dense" sx={{ width: '25rem' }}>
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
          {formik.touched.password && formik.errors.password ? (
            <Alert align="justify" severity="warning" sx={{ width: '23rem' }}>
              <AlertTitle> Warning </AlertTitle>
              {formik.errors.password}
            </Alert>
          ) : null}
        </FormControl>
        <br />
        <br />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    );
  };

  return (
    <form className="form-container">
      <SignupForm />
    </form>
  );
};

export default LoginForm;
