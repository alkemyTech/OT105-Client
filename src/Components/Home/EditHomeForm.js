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
  Container,
  TextField,
  Paper,
  Stack,
} from '@mui/material';
import s from '../../Styles/EditHomeForm.module.css';
import SlidesForm from '../Slides/SlidesForm';
import {
  containerStyles,
  formStyles,
  paperStyles,
} from '../../Styles/EditHomeFormStyles';
import { productSansFont, sourceSerifProFont } from '../../Styles/fontStyles';

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

  return (
    <Container maxWidth="md" sx={containerStyles}>
      <Typography color="initial" sx={productSansFont} variant="h3">
        Editar página de inicio
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          marginBlock: '4rem',
        }}>
        <form sx={formStyles} onSubmit={formik.handleSubmit}>
          <Stack spacing={5}>
            <TextField
              autoFocus
              fullWidth
              error={
                formik.touched.welcomeText && Boolean(formik.errors.welcomeText)
              }
              helperText={
                formik.touched.welcomeText && formik.errors.welcomeText
              }
              id="welcomeText"
              label="Texto de bienvenida"
              value={formik.values.welcomeText}
              variant="standard"
              onChange={formik.handleChange}
            />
            <Button color="primary" type="submit" variant="outlined">
              Cambiar texto de bienvenida
            </Button>
          </Stack>
        </form>
      </Paper>

      <Stack spacing={5}>
        <Paper elevation={3} sx={paperStyles}>
          <Typography
            align="center"
            color="initial"
            sx={sourceSerifProFont}
            variant="h4">
            Slide 1
          </Typography>
          <SlidesForm />
        </Paper>
        <Paper elevation={3} sx={paperStyles}>
          <Typography
            align="center"
            color="initial"
            sx={sourceSerifProFont}
            variant="h4">
            Slide 2
          </Typography>
          <SlidesForm />
        </Paper>

        <Paper elevation={3} sx={paperStyles}>
          <Typography
            align="center"
            color="initial"
            sx={sourceSerifProFont}
            variant="h4">
            Slide 3
          </Typography>
          <SlidesForm />
        </Paper>
      </Stack>
    </Container>
  );
};

export default EditHomeForm;
