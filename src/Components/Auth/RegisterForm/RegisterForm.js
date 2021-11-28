import React from 'react';
import '../../FormStyles.css';
import { useForm } from './useForm';

const RegisterForm = () => {
  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [values, handleInputChange] = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'tokenValueExample');
    // eslint-disable-next-line no-console
    console.table({ ...values });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-field"
        name="name"
        placeholder="Enter name"
        type="text"
        value={values.name}
        onChange={handleInputChange}
      />
      <input
        className="input-field"
        name="lastName"
        placeholder="Enter last name"
        type="text"
        value={values.lastName}
        onChange={handleInputChange}
      />
      <input
        className="input-field"
        name="email"
        placeholder="Enter email"
        type="email"
        value={values.email}
        onChange={handleInputChange}
      />
      <input
        className="input-field"
        name="password"
        placeholder="Enter password"
        type="password"
        value={values.password}
        onChange={handleInputChange}
      />
      <input
        className="input-field"
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        value={values.confirmPassword}
        onChange={handleInputChange}
      />

      <button className="submit-btn" type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
