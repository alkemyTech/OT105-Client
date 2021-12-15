import React from 'react';
import '../../../Styles/FormStyles.css';
import { Formik, Field, Form } from 'formik';
import { SignupSchema } from './SignupSchema';
import { Alert } from '@mui/material';

const RegisterForm = () => {
  const userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    delete values.confirmPassword;
  };

  const showAlert = (type, text) => {
    return <Alert severity={type}>{text}</Alert>;
  };

  return (
    <Formik
      initialValues={userData}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className="form-container">
          <h1>Register</h1>
          <label htmlFor="firstName">First Name</label>
          <Field
            className="input-field"
            id="firstName"
            name="firstName"
            placeholder="Your first name"
          />
          {errors.firstName && touched.firstName
            ? showAlert('warning', errors.firstName)
            : null}
          <label htmlFor="lastName">Last Name</label>
          <Field
            className="input-field"
            id="lastName"
            name="lastName"
            placeholder="Your last name"
          />
          {errors.lastName && touched.lastName
            ? showAlert('warning', errors.lastName)
            : null}
          <label htmlFor="email">Email</label>
          <Field
            className="input-field"
            id="email"
            name="email"
            placeholder="example@example.com"
            type="email"
          />
          {errors.email && touched.email
            ? showAlert('warning', errors.email)
            : null}
          <label htmlFor="password">Password</label>
          <Field
            className="input-field"
            id="password"
            name="password"
            placeholder="Your password"
            type="text"
          />
          {errors.password && touched.password
            ? showAlert('warning', errors.password)
            : null}
          <label htmlFor="confirmPassword">Confirm password</label>
          <Field
            className="input-field"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="text"
          />
          {errors.confirmPassword && touched.confirmPassword
            ? showAlert('warning', errors.confirmPassword)
            : null}
          <button className="submit-btn" disabled={!errors} type="submit">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
