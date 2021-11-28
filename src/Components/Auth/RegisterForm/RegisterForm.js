import React from 'react';
import '../../FormStyles.css';
import { Formik, Field, Form } from 'formik';
import { SignupSchema } from './SignupSchema';
import { Alert } from '@mui/material';

const RegisterForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (values) => {
    delete values.confirmPassword;
    // eslint-disable-next-line no-console
    console.table({ ...values });
  };

  return (
    <Formik
      initialValues={initialValues}
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
          {errors.firstName && touched.firstName ? (
            <Alert severity="warning">{errors.firstName}</Alert>
          ) : null}
          <label htmlFor="lastName">Last Name</label>
          <Field
            className="input-field"
            id="lastName"
            name="lastName"
            placeholder="Your last name"
          />
          {errors.lastName && touched.lastName ? (
            <Alert severity="warning">{errors.lastName}</Alert>
          ) : null}
          <label htmlFor="email">Email</label>
          <Field
            className="input-field"
            id="email"
            name="email"
            placeholder="example@example.com"
            type="email"
          />
          {errors.email && touched.email ? (
            <Alert severity="warning">{errors.email}</Alert>
          ) : null}
          <label htmlFor="password">Password</label>
          <Field
            className="input-field"
            id="password"
            name="password"
            placeholder="Your password"
            type="text"
          />
          {errors.password && touched.password ? (
            <Alert severity="warning">{errors.password}</Alert>
          ) : null}
          <label htmlFor="confirmPassword">Confirm password</label>
          <Field
            className="input-field"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            type="text"
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <Alert severity="warning">{errors.confirmPassword}</Alert>
          ) : null}
          <button className="submit-btn" disabled={!errors} type="submit">
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
