import React, { useState, useEffect } from 'react';
import { dropzoneConfig, isEmptyList, listHasValues } from '../../Utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { createNews, editNews, getNewsById } from '../../Services/NewsService';
import {
  TextField,
  Box,
  Button,
  Alert,
  Typography,
  Paper,
} from '@mui/material';
import '../FormStyles.css';
import '../../Styles/CategoriesFormStyles.css';
import { URLImageToBlob } from '../../Services/imageService';
import '../../Styles/CategoriesFormStyles.css';

const NewsCreateEdit = ({ match }) => {
  const [categoryDescription, setCategoryDescription] = useState('');
  const [image, setImage] = useState('');
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const [imageError, setImageError] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;

  const id = match.params.id;

  const handleDrop = (acceptedFiles, fileRejections) => {
    const imageFileWithPreview = addImagePreviewtoImageFile(acceptedFiles);

    setImage(imageFileWithPreview);
    if (isEmptyList(fileRejections)) imageFileToBase64File(acceptedFiles);
  };

  const imageFileToBase64File = (acceptedFiles) => {
    const reader = new FileReader();

    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const base64 = reader.result;

      setBase64ImageFile(base64);
    };
  };

  const addImagePreviewtoImageFile = (acceptedFiles) => {
    return acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );
  };

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

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = 'El titulo es requerido';
    } else if (values.title.length < 4) {
      errors.title = 'El titulo debe contener al menos 4 caracteres';
    }
    if (!categoryDescription) {
      errors.description = 'La descripción es requerida';
    }
    if (!base64ImageFile) {
      errors.image = 'La imagen es requerida';
    }

    return errors;
  };

  const isEditingMode = () => id !== undefined;

  const updateCategorieswithCurrentData = async () => {
    let currentNews = await getNewsById(id);

    formik.values.title = currentNews.name;
    setCategoryDescription(currentNews.content);

    URLImageToBlob(currentNews.image).then((res) => {
      setImage(res);
      setBase64ImageFile(res);
    });
  };

  const handleCKeditorChange = (e, editor) =>
    setCategoryDescription(editor.getData());

  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      categoryDescription: '',
      image: '',
    },
    validate,
    onSubmit: (values) => handleSubmitbecategory(values),
  });

  useEffect(() => {
    imageValidation();
  }, [fileRejections]);

  useEffect(() => {
    if (isEditingMode()) updateCategorieswithCurrentData();
  }, []);

  const handleSubmitbecategory = async () => {
    const body = {
      name: formik.values.title,
      content: categoryDescription,
      image: base64ImageFile,
    };

    if (id) {
      editNews(id, body).then((resp) => setApiResponse(resp));
    } else {
      createNews(body).then((resp) => setApiResponse(resp));
    }
  };

  return (
    <div className="bckg">
      <Box
        noValidate
        className="form-container"
        component="form"
        onSubmit={formik.handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '3rem',
            gap: '2rem',
          }}>
          <Typography component="div" variant="h5">
            Title
          </Typography>

          <TextField
            autoComplete="off"
            label="Title"
            name="title"
            type="text"
            value={formik.values.title}
            variant="outlined"
            onChange={formik.handleChange}
          />

          {formik.errors.title && showErrorMessage(formik.errors.title)}

          <Typography component="div" variant="h5">
            Descripcion
          </Typography>

          <CKEditor
            data={categoryDescription}
            editor={ClassicEditor}
            onChange={(e, editor) => handleCKeditorChange(e, editor)}
          />

          {formik.errors.description &&
            showErrorMessage(formik.errors.description)}

          <Typography component="div" variant="h5">
            Imagen
          </Typography>

          <Box
            className="dropzone-container"
            component="div"
            {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Arrastra o haz click aqui para agregar Imagen ( .png o .jpg )</p>

            <div className="thumbs-container">
              <div className="thumb">
                <div className="thumbInner">
                  {listHasValues(image) && (
                    <img className="thumb-image" src={image} />
                  )}
                </div>
              </div>
            </div>
          </Box>

          {formik.errors.image && showErrorMessage(formik.errors.image)}

          {imageError && (
            <Alert severity="warning"> Solo una imagen .jpg / .png</Alert>
          )}

          <Button
            className="submit-btn"
            sx={{
              width: { xs: '100%', sm: '200px' },
            }}
            type="submit"
            variant="contained">
            Enviar
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default NewsCreateEdit;
