import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { TextField, Box, Button, Alert, Typography } from '@mui/material';
import axios from 'axios';

import '../../Styles/TestimonialsFormStyles.css';
import '../FormStyles.css';

const TestimonialForm = ({ id }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(false);

  const getTestimonials = () => {
    return {
      name: 'Testimonial testings',
      description: 'This is a mockup testimonial',
      image: '',
    };
  };

  useEffect(() => {
    if (id) {
      const resp = getTestimonials();

      formik.values.name = resp.name;
      setDescription(resp.description);
    }
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'El nombre es requerido';
    } else if (values.name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!description) {
      errors.description = 'La descripción es requerida';
    }
    if (!image) {
      errors.image = 'La imagen es requerida';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
    },
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleCKeditorChange = (e, editor) => {
    const data = editor.getData();

    setDescription(data);
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles, fileRejections) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );

      if (fileRejections.length === 0) {
        const reader = new FileReader();

        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = () => {
          const base64 = reader.result;

          setImage(base64);
        };
      }
    },
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      setImageError(true);

      return;
    }

    setImageError(false);
  }, [fileRejections]);

  const handleSubmit = async () => {
    const body = {
      name: formik.values.name,
      description,
      image,
    };

    let resp;

    id
      ? (resp = await axios.patch(
          `http://ongapi.alkemy.org/api/testimonials/${id}`,
          body,
        ))
      : (resp = await axios.post(
          'http://ongapi.alkemy.org/api/testimonials/',
          body,
        ));
  };

  console.log(files);

  return (
    <Box
      noValidate
      className="form-container"
      component="form"
      onSubmit={formik.handleSubmit}>
      <Typography variant="h5" component="div">
        Titulo
      </Typography>

      <TextField
        autoComplete="off"
        label="Titulo"
        name="name"
        type="text"
        value={formik.values.name}
        variant="outlined"
        onChange={formik.handleChange}
      />

      {formik.errors.name && (
        <Alert severity="warning">{formik.errors.name}</Alert>
      )}

      <Typography variant="h5" component="div">
        Descripcion
      </Typography>

      <CKEditor
        data={description}
        editor={ClassicEditor}
        onChange={(e, editor) => handleCKeditorChange(e, editor)}
      />

      {formik.errors.description && (
        <Alert severity="warning">{formik.errors.description}</Alert>
      )}

      <Typography variant="h5" component="div">
        Imagen
      </Typography>

      <Box component="div" className="dropzone-container" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          Arrastra una imagen o haz click aqui para agregarla ( .png o .jpg )
        </p>

        <div className="thumbs-container">
          <div className="thumb">
            <div className="thumbInner">
              {files.length > 0 && (
                <img className="thumb-image" src={files[0].preview} />
              )}
            </div>
          </div>
        </div>
      </Box>

      {formik.errors.image && (
        <Alert severity="warning">{formik.errors.image}</Alert>
      )}

      {imageError && (
        <Alert severity="warning"> Solo una imagen .jpg / .png</Alert>
      )}

      <Button className="submit-btn" type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
};

export default TestimonialForm;
