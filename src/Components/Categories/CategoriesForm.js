import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { TextField, Box, Button, Alert, Typography } from '@mui/material';
import '../FormStyles.css';
import '../../Styles/CategoriesFormStyles.css';

const CategoriesForm = ({ id }) => {
  const [categoryDescription, setCategoryDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [filesDropzone, setFilesDropzone] = useState([]);

  const getCategory = (id) => ({
    name: 'Categories Test ',
    description: 'Test text',
    image: '',
  });

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'El nombre es requerido';
    } else if (values.name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!categoryDescription) {
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
      categoryDescription: '',
      image: '',
    },
    validate,
    onSubmit: (values) => handleSubmitbecategory(values),
  });

  const handleCKeditorChange = (e, editor) =>
    setCategoryDescription(editor.getData());

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles, fileRejections) => {
      setFilesDropzone(
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
    if (id) {
      const resp = getCategory();

      formik.values.name = resp.name;
      setCategoryDescription(resp.categoryDescription);
    }
  }, []);

  useEffect(() => {
    if (fileRejections.length > 0) {
      setImageError(true);

      return;
    }

    setImageError(false);
  }, [fileRejections]);

  const handleSubmitbecategory = async () => {
    const body = {
      name: formik.values.name,
      categoryDescription,
      image,
    };

    let resp;

    id
      ? (resp = await axios.patch(
          `http://ongapi.alkemy.org/api/categories/${id}`,
          body,
        ))
      : (resp = await axios.post(
          'http://ongapi.alkemy.org/api/categories/',
          body,
        ));
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

      {formik.errors.name && (
        <Alert severity="warning">{formik.errors.name}</Alert>
      )}

      <Typography component="div" variant="h5">
        Descripcion
      </Typography>

      <CKEditor
        data={categoryDescription}
        editor={ClassicEditor}
        onChange={(e, editor) => handleCKeditorChange(e, editor)}
      />

      {formik.errors.description && (
        <Alert severity="warning">{formik.errors.description}</Alert>
      )}

      <Typography component="div" variant="h5">
        Imagen
      </Typography>

      <Box className="dropzone-container" component="div" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Arrastra o haz click aqui para agregar Imagen ( .png o .jpg )</p>

        <div className="thumbs-container">
          <div className="thumb">
            <div className="thumbInner">
              {filesDropzone.length > 0 && (
                <img className="thumb-image" src={filesDropzone[0].preview} />
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

export default CategoriesForm;
