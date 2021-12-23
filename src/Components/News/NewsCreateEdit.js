import React, { useState, useEffect } from 'react';
import { dropzoneConfig, isEmptyList, listHasValues } from '../../Utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { urlEditNews, urlCreateNews } from '../../Services/NewsService';
import { TextField, Box, Button, Alert, Typography } from '@mui/material';
import '../FormStyles.css';
import '../../Styles/CategoriesFormStyles.css';

const NewsCreateEdit = ({ id }) => {
  const [categoryDescription, setCategoryDescription] = useState('');
  const [image, setImage] = useState('');
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const [imageError, setImageError] = useState(false);
  const [apiResponse, setApiResponse] = useState({});
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;

  const getCategory = () => ({
    title: 'Categories Test ',
    categoryDescription: 'Test text',
    image: '',
  });

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

  const updateCategorieswithCurrentData = () => {
    const currentCategories = getCategory();

    formik.values.title = currentCategories.title;
    setCategoryDescription(currentCategories.categoryDescription);
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
      title: formik.values.title,
      description: categoryDescription,
      image: base64ImageFile,
    };

    if (id) {
      urlCreateNews(id, body).then((resp) => setApiResponse(resp.data));
    } else {
      urlEditNews(body).then((resp) => setApiResponse(resp.data));
    }
  };

  return (
    <Box
      noValidate
      className="form-container"
      component="form"
      onSubmit={formik.handleSubmit}>
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

      {formik.errors.description && showErrorMessage(formik.errors.description)}

      <Typography component="div" variant="h5">
        Imagen
      </Typography>

      <Box className="dropzone-container" component="div" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Arrastra o haz click aqui para agregar Imagen ( .png o .jpg )</p>

        <div className="thumbs-container">
          <div className="thumb">
            <div className="thumbInner">
              {listHasValues(image) && (
                <img className="thumb-image" src={image[0].preview} />
              )}
            </div>
          </div>
        </div>
      </Box>

      {formik.errors.image && showErrorMessage(formik.errors.image)}

      {imageError && (
        <Alert severity="warning"> Solo una imagen .jpg / .png</Alert>
      )}

      <Button className="submit-btn" type="submit" variant="contained">
        Enviar
      </Button>
    </Box>
  );
};

export default NewsCreateEdit;
