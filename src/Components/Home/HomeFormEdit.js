import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

export default function HomeFormEdit() {
  const [welcomeText, setWelcomeText] = useState('');

  return (
    <>
      <Formik
        initialValues={{
          welcomeText: '',
        }}
        validationSchema={Yup.object({
          welcomeText: Yup.string()
            .min(
              20,
              'El texto de bienvenida debe ser de al menos 20 caracteres',
            )
            .required('Este campo es obligatorio'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          Swal.fire({
            text: 'El texto de bienvenida se actualizó correctamente!',
            icon: 'success',
            confirmButtonText: 'Hecho',
          });
          setWelcomeText(values.welcomeText);
          setSubmitting(false);
        }}>
        <Form>
          <label htmlFor="welcomeText"> Texto de bienvenida</label>
          <Field as="textarea" name="welcomeText" />
          <ErrorMessage name="welcomeText" />

          <Button color="primary" type="submit" variant="text">
            Cambiar texto de bienvenida
          </Button>
        </Form>
      </Formik>
    </>
  );
}
