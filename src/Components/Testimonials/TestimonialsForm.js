import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { TextField, Box, Button, Alert, Typography } from '@mui/material';
import { testimonialFormService } from '../../Services/testimonialsService';
import { listHasValues, dropzoneConfig } from '../../utils';
import '../../Styles/TestimonialsFormStyles.css';
import '../FormStyles.css';

const TestimonialForm = ({ id }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const [testimonialDescription, setTestimonialDescription] = useState('');
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;

  const getTestimonial = () => ({
    name: 'Testimonial testings',
    description: 'This is a mockup testimonial',
    image: '',
  });

  const handleDrop = (acceptedFiles, fileRejections) => {
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
  };

  const handleCKeditorChange = (e, editor) => {
    const data = editor.getData();

    setTestimonialDescription(data);
  };

  const checkIfIsEditing = () => {
    if (id) {
      const resp = getTestimonial();

      formik.values.name = resp.name;
      setTestimonialDescription(resp.description);
    }
  };

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  useEffect(() => {
    checkIfIsEditing();
  }, []);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'El nombre es requerido';
    } else if (values.name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!testimonialDescription) {
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

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: multipleFiles,
    maxFiles,
    accept: validImages,
    onDrop: (acceptedFiles, fileRejections) =>
      handleDrop(acceptedFiles, fileRejections),
  });

  const imageValidation = () => {
    if (listHasValues(fileRejections)) {
      setImageError(true);

      return;
    }
    setImageError(false);
  };

  useEffect(() => {
    imageValidation();
  }, [fileRejections]);

  const handleSubmit = async () => {
    const body = {
      name: formik.values.name,
      description: testimonialDescription,
      image,
    };

    testimonialFormService(id, body).then((resp) => setApiResponse(resp.data));
  };

  return (
    <Box
      noValidate
      className="form-container"
      component="form"
      onSubmit={formik.handleSubmit}>
      <Typography component="div" variant="h5">
        Título
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

      {formik.errors.name && showErrorMessage(formik.errors.name)}

      <Typography component="div" variant="h5">
        Descripción
      </Typography>

      <CKEditor
        data={testimonialDescription}
        editor={ClassicEditor}
        onChange={(e, editor) => handleCKeditorChange(e, editor)}
      />

      {formik.errors.description && showErrorMessage(formik.errors.description)}

      <Typography component="div" variant="h5">
        Imagen
      </Typography>

      <Box className="dropzone-container" component="div" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>
          Arrastra una imagen o haz click aqui para agregarla ( .png o .jpg )
        </p>
        <div className="thumbs-container">
          <div className="thumb">
            <div className="thumbInner">
              {listHasValues(files) && (
                <img className="thumb-image" src={files[0].preview} />
              )}
            </div>
          </div>
        </div>
      </Box>

      {formik.errors.image && showErrorMessage(formik.errors.image)}
      {imageError && showErrorMessage('Solo una imagen .jpg / .png')}

      <Button className="submit-btn" type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
};

export default TestimonialForm;
