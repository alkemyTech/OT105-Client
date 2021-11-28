import React from 'react';
import '../../FormStyles.css';

import { Formik, Field, Form } from 'formik';

const RegisterForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (e) => {
    /* e.preventDefault();
    localStorage.setItem('token', 'tokenValueExample');
    // eslint-disable-next-line no-console
    console.table({ ...values }); */
    console.log(e);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="form-container">
        <h1>Register</h1>
        <label htmlFor="firstName">First Name</label>
        <Field
          className="input-field"
          id="firstName"
          name="firstName"
          placeholder="Your first name"
        />

        <label htmlFor="lastName">Last Name</label>
        <Field
          className="input-field"
          id="lastName"
          name="lastName"
          placeholder="Your last name"
        />

        <label htmlFor="email">Email</label>
        <Field
          className="input-field"
          id="email"
          name="email"
          placeholder="example@example.com"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <Field
          className="input-field"
          id="password"
          name="password"
          placeholder="Your password"
          type="password"
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <Field
          className="input-field"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          type="password"
        />

        <button className="submit-btn" type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
