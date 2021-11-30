import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Alert } from '@mui/material';
import { UserFormSchema } from './UserFormSchema';
import { CustomDropzone } from './CustomDropzone';
import '../FormStyles.css';
import axios from 'axios';

const UserForm = ({ user = null }) => {
  const [success, setSuccess] = useState({
    status: false,
    errors: null,
  });
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    roleId: '',
  });
  const userValues = user
    ? { ...user, role: user.role_id }
    : {
        name: '',
        email: '',
        password: '',
        role: '',
        image: '',
      };

  const handleSubmit = async (values, formik) => {};

  const setImage = (image) => {
    userValues.image = image;
  };

  const clearImage = () => {
    userValues.image = '';
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
            name="name"
            placeholder="User name"
            type="text"
            value={userValues.name}
          />
          {errors.name && touched.name ? (
            <Alert severity="warning">{errors.name}</Alert>
          ) : null}

          <label htmlFor="userEmail">User email</label>
          <Field
            className="input-field"
            name="email"
            placeholder="User email"
            type="text"
            value={userValues.email}
          />
          {errors.email && touched.email ? (
            <Alert severity="warning">{errors.email}</Alert>
          ) : null}

          <label htmlFor="userEmail">User role</label>
          <Field
            as="select"
            className="input-field"
            name="role"
            placeholder="User email"
            type="text"
            value={userValues.role}>
            <option disabled value="">
              Select the role
            </option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </Field>
          {errors.role && touched.role ? (
            <Alert severity="warning">{errors.role}</Alert>
          ) : null}

          <label htmlFor="userPassword">User password</label>
          <Field
            className="input-field"
            id="password"
            name="password"
            placeholder="User password"
            type="text"
            value={userValues.password}
          />
          {errors.password && touched.password ? (
            <Alert severity="warning">{errors.password}</Alert>
          ) : null}

          <label htmlFor="userImage">User image</label>
          <CustomDropzone setImage64={setImage} />

          <button className="submit-btn" type="submit">
            {user ? 'Edit User' : 'Create User'}
          </button>
          {success.status && (
            <Alert severity="success">{`Usuario ${
              user ? 'editado' : 'guardado'
            } con éxito`}</Alert>
          )}
          {success.errors && (
            <Alert severity="error">
              Error en el envío del formulario comprueba la información
            </Alert>
          )}
          <button className="submit-btn" type="submit">
            {user ? 'Edit User' : 'Create User'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
