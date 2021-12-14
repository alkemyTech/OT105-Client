import React, { useState } from 'react';
import { useFormik } from 'formik';
import { emailRegex } from '../../utils';
import { TextField, Box, Button, Alert, Typography } from '@mui/material';
import '../FormStyles.css';
import { gcreateContact } from '../../Services/ConctactService';

const FormContact = () => {
  const [apiResponse, setApiResponse] = useState({});
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'El nombre es requerido';
    } else if (values.name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!values.email) {
      errors.email = 'La descripción es requerida';
    } else if (!emailRegex.test(values.email)) {
      errors.email = 'Tiene que ser un Email';
    }
    if (!values.phone) {
      errors.phone = 'El telefono es requerido';
    } else if (isNaN(values.phone)) {
      errors.phone = 'Tiene que ser un numero';
    } else if (values.phone.length < 8) {
      errors.phone = 'El numero debe contener al menos 8 caracteres';
    }
    if (!values.message) {
      errors.message = 'El mensaje es requerido';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validate,
    onSubmit: (values) => handleSubmitContact(values),
  });

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  const handleSubmitContact = async () => {
    const body = {
      name: formik.values.name,
      email: formik.values.email,
      phone: formik.values.phone,
      message: formik.values.message,
    };

    gcreateContact(body).then((resp) => setApiResponse(resp.data));
  };

  return (
    <Box
      noValidate
      className="form-container"
      component="form"
      onSubmit={formik.handleSubmit}>
      <Typography component="div" variant="h5">
        Name
      </Typography>

      <TextField
        autoComplete="off"
        label="Name"
        name="name"
        type="text"
        value={formik.values.name}
        variant="outlined"
        onChange={formik.handleChange}
      />

      {formik.errors.name && showErrorMessage(formik.errors.name)}

      <Typography component="div" variant="h5">
        Email
      </Typography>

      <TextField
        autoComplete="off"
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        variant="outlined"
        onChange={formik.handleChange}
      />

      {formik.errors.email && showErrorMessage(formik.errors.email)}
      <Typography component="div" variant="h5">
        Phone
      </Typography>

      <TextField
        autoComplete="off"
        label="Phone"
        name="phone"
        type="text"
        value={formik.values.phone}
        variant="outlined"
        onChange={formik.handleChange}
      />

      {formik.errors.phone && showErrorMessage(formik.errors.phone)}
      <Typography component="div" variant="h5">
        Message
      </Typography>

      <TextField
        autoComplete="off"
        label="Message"
        name="message"
        type="text"
        value={formik.values.message}
        variant="outlined"
        onChange={formik.handleChange}
      />

      {formik.errors.message && showErrorMessage(formik.errors.message)}

      <Button className="submit-btn" type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
};

export default FormContact;
