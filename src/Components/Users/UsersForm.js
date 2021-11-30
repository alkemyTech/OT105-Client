import React from 'react';
import '../FormStyles.css';
import { Field, Form, Formik } from 'formik';
import { Alert } from '@mui/material';
import { UserFormSchema } from './UserFormSchema';

const UserForm = ({ user = null }) => {
  const userValues = user
    ? { ...user }
    : {
        name: '',
        email: '',
        password: '',
        role: '',
        image: '',
      };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={userValues}
      validationSchema={UserFormSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form className="form-container">
          <h1>{user ? 'Edit User' : 'Create User'}</h1>
          <label htmlFor="userName">User name</label>
          <Field
            className="input-field"
            id="name"
            name="name"
            placeholder="User name"
            type="text"
          />
          {errors.name && touched.name ? (
            <Alert severity="warning">{errors.name}</Alert>
          ) : null}

          <label htmlFor="userEmail">User email</label>
          <Field
            className="input-field"
            id="email"
            name="email"
            placeholder="User email"
            type="text"
          />
          {errors.email && touched.email ? (
            <Alert severity="warning">{errors.email}</Alert>
          ) : null}

          <label htmlFor="userEmail">User role</label>
          <Field
            as="select"
            className="input-field"
            id="role"
            name="role"
            placeholder="User email"
            type="text">
            <option disabled value="">
              Select the role
            </option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </Field>
          {errors.role && touched.role ? (
            <Alert severity="warning">{errors.role}</Alert>
          ) : null}

          <label htmlFor="userEmail">User password</label>
          <Field
            className="input-field"
            id="password"
            name="password"
            placeholder="User password"
            type="text"
          />
          {errors.password && touched.password ? (
            <Alert severity="warning">{errors.password}</Alert>
          ) : null}
          <button className="submit-btn" type="submit">
            {user ? 'Edit User' : 'Create User'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
