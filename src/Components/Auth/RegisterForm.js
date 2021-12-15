import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import '../FormStyles.css';

const RegisterForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    lastName: '',
  });

  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = (e) => {
    if (e.target.textContent === 'Aceptar') {
      console.log('Términos aceptados');
    } else {
      console.log('Términos rechazados');
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setInitialValues({ ...initialValues, name: e.target.value });
    }
    if (e.target.name === 'lastName') {
      setInitialValues({ ...initialValues, lastName: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    localStorage.setItem('token', 'tokenValueExample');
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-field"
          name="name"
          placeholder="Enter name"
          type="text"
          value={initialValues.name}
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="lastName"
          placeholder="Enter last name"
          type="text"
          value={initialValues.lastName}
          onChange={handleChange}
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>
      <Dialog
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        open={open}
        onClose={handleClose}>
        <DialogTitle>{'¿Acepta los términos y condiciones?'}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e)}>Rechazar</Button>
          <Button onClick={(e) => handleClose(e)}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterForm;
