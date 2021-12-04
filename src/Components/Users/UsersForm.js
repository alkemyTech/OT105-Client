import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Alert } from '@mui/material';
import { UserFormSchema } from './UserFormSchema';
import { CustomDropzone } from './CustomDropzone';
import '../FormStyles.css';

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

  const handleSubmit = async (values, formik) => {
    try {
      const url = 'http://ongapi.alkemy.org/api/';
      const response = await axios.post(`${url}users`, JSON.stringify(values), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess({
          ...success,
          status: true,
        });
        formik.resetForm();
        setTimeout(() => {
          setSuccess({
            ...success,
            status: false,
          });
        }, 4000);
      }
    } catch (e) {
      setSuccess({
        status: false,
        errors: true,
      });
      setTimeout(() => {
        setSuccess({
          status: false,
          errors: null,
        });
      }, 4000);
    }
  };

  const setImage = (image) => {
    userValues.image = image;
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
            type="email"
            value={userValues.email}
          />
          {errors.email && touched.email ? (
            <Alert severity="warning">{errors.email}</Alert>
          ) : null}

          <label htmlFor="userRole">User role</label>
          <Field
            as="select"
            className="input-field"
            id="role"
            name="role"
            placeholder="User Role"
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
