import React from 'react';
import { Field, Form, Formik } from 'formik';
import '../FormStyles.css';

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
    //console.log(values);
  };

  return (
    <Formik
      className="form-container"
      initialValues={userValues}
      onSubmit={handleSubmit}>
      <Form className="form-container" onSubmit={handleSubmit}>
        <h1>{user ? 'Edit User' : 'Create User'}</h1>
        <label htmlFor="userName">User name</label>
        <Field
          className="input-field"
          name="name"
          placeholder="User name"
          type="text"
          value={userValues.name}
        />
        <label htmlFor="userEmail">User email</label>
        <Field
          className="input-field"
          name="email"
          placeholder="User email"
          type="text"
          value={userValues.email}
        />
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
        <button className="submit-btn" type="submit">
          {user ? 'Edit User' : 'Create User'}
        </button>
      </Form>
    </Formik>
  );
};

export default UserForm;
