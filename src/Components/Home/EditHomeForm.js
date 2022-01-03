import React, { useState, useEffect } from 'react';
import {
  editWelcomeMessage,
  getWelcomeMessage,
} from '../../Services/homeService';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import {
  Button,
  Typography,
  Alert,
  TextField,
  Paper,
  Stack,
} from '@mui/material';
import { formStyles, containerStyles } from '../../Styles/EditHomeFormStyles';
import '../FormStyles.css';

const validationSchema = Yup.object({
  welcomeText: Yup.string()
    .min(20, 'El texto de bienvenida debe ser de al menos 20 caracteres')
    .required('Este campo es obligatorio'),
});

const EditHomeForm = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    getWelcomeMessage().then((message) => {
      setInitialWelcomeText(message);
    });
  }, []);

  const setInitialWelcomeText = (welcomeText) => {
    formik.values.welcomeText = welcomeText;
    setWelcomeMessage(welcomeText);
  };

  const onFormikSubmit = (values, { setSubmitting }) => {
    Swal.fire({
      text: 'El texto de bienvenida se actualizó correctamente!',
      icon: 'success',
      confirmButtonText: 'Hecho',
    });

    editWelcomeMessage(values.welcomeText);
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      welcomeText: welcomeMessage,
    },
    validationSchema,
    onSubmit: onFormikSubmit,
  });

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  return (
    <div className="bckg">
      <div style={containerStyles}>
        <Typography align="center" component="div" variant="h3">
          Editar página de inicio
        </Typography>
        <Paper
          elevation={3}
          sx={{
            padding: '2rem',
            marginBlock: '4rem',
            width: {
              s: '300px',
              md: '600px',
            },
            justifySelf: 'center',
            alignSelf: 'center',
          }}>
          <form sx={formStyles} onSubmit={formik.handleSubmit}>
            <Stack spacing={5}>
              <TextField
                error={
                  formik.touched.welcomeText &&
                  Boolean(formik.errors.welcomeText)
                }
                id="welcomeText"
                placeholder="Texto de bienvenida"
                value={formik.values.welcomeText}
                variant="outlined"
                onChange={formik.handleChange}
              />
              {formik.touched.welcomeText &&
                formik.errors.welcomeText &&
                showErrorMessage(formik.errors.welcomeText)}
              <Button
                className="submit-btn"
                sx={{
                  width: { xs: '100%', sm: '300px' },
                }}
                type="submit"
                variant="contained">
                Cambiar texto de bienvenida
              </Button>
            </Stack>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default EditHomeForm;
