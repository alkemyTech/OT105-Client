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
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(false);

  //*************************************INITIAL FORM *********************************************/
  const getCategories = () => {
    return {
      name: 'Categories Test ',
      description: 'Test text',
      image: '',
    };
  };

  useEffect(() => {
    if (id) {
      const resp = getCategories();

      formik.values.name = resp.name;
      setDescription(resp.description);
    }
  }, []);

  //**************************VALIDATE************************************** */
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

  //********************************FORMIK FORM*********************************** */
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

  //****************************DROPZONE****** ONE FILE-.JPEG/.PNG***********previews***************** */
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
      //*****************************BASE 64 FOR SERVER*************************************** */
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

  //*****************************SUBMIT AND AXIOS PATCH/POST BY ID *****************************************/

  const handleSubmit = async () => {
    const body = {
      name: formik.values.name,
      description,
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

      <Typography component="div" variant="h5">
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

      <Typography component="div" variant="h5">
        Imagen
      </Typography>

      <Box className="dropzone-container" component="div" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Arrastra o haz click aqui para agregar Imagen ( .png o .jpg )</p>

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

export default CategoriesForm;
