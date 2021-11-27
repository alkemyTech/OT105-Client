import React, { useState } from 'react';
//Forms
import { useFormik } from 'formik';
import * as Yup from 'yup';
//Styles
import Swal from 'sweetalert2';
import {
  Button,
  Typography,
  Container,
  TextField,
  Paper,
  Stack,
} from '@mui/material';
//Components
import SlidesForm from '../Slides/SlidesForm';

const validationSchema = Yup.object({
  welcomeText: Yup.string()
    .min(20, 'El texto de bienvenida debe ser de al menos 20 caracteres')
    .required('Este campo es obligatorio'),
});

export default function HomeFormEdit() {
  const [welcomeText, setWelcomeText] = useState('');

  const formik = useFormik({
    initialValues: {
      welcomeText: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      Swal.fire({
        text: 'El texto de bienvenida se actualizó correctamente!',
        icon: 'success',
        confirmButtonText: 'Hecho',
      });
      setWelcomeText(values.welcomeText);
      setSubmitting(false);
    },
  });

  return (
    <Container maxWidth="md" sx={{ marginBlock: '4rem' }}>
      <Typography variant="h3" color="initial">
        Editar página de inicio
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          marginBlock: '5rem',
        }}>
        <form
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            flexDirection: 'column',
          }}
          onSubmit={formik.handleSubmit}>
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
        <Paper
          elevation={3}
          sx={{
            padding: '2rem',
          }}>
          <Typography align="center" color="initial" variant="h4">
            Slide 1
          </Typography>
          <SlidesForm />
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: '2rem',
          }}>
          <Typography align="center" color="initial" variant="h4">
            Slide 2
          </Typography>
          <SlidesForm />
        </Paper>

        <Paper
          elevation={3}
          sx={{
            padding: '2rem',
          }}>
          <Typography align="center" color="initial" variant="h4">
            Slide 3
          </Typography>
          <SlidesForm />
        </Paper>
      </Stack>
    </Container>
  );
}
