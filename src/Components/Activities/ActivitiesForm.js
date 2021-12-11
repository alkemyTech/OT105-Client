import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { dropzoneConfig, isEmptyList } from '../../Utils';
import '../FormStyles.css';
<<<<<<< HEAD
import '../../Styles/ActivitiesForm.css';
import { createOrUpdateActivity } from '../../Services/activitiesService';
=======
import {
  deleteActivityById,
  getActivities,
  getActivityById,
  postActivity,
  putActivity,
} from '../../Services/ActivitiesServices';
>>>>>>> 47630b0 (ActivitiesServices created and conected to every activities component)

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  margin: 'auto',
  width: 'auto',
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

const ActivitiesForm = ({ id }) => {
  const [formValues, setFormValues] = useState({
    name: id ? id.data.name : '',
    description: id ? id.data.description : '',
    image: id ? id.data.image : null,
  });

  const [filesImages, setFilesImages] = useState([]);
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;
  const [activitiesDescription, setActivitiesDescription] = useState('');

  const handleDrop = (acceptedFiles, fileRejections) => {
    const imageFileWithPreview = addImagePreviewtoImageFile(acceptedFiles);

    setFilesImages(imageFileWithPreview);
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

  const handleCKeditorChange = (e, editor) => {
    const data = editor.getData();

    setActivitiesDescription(data);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: multipleFiles,
    maxFiles: maxFiles,
    accept: validImages,
    onDrop: (acceptedFiles, fileRejections) =>
      handleDrop(acceptedFiles, fileRejections),
  });

  const imagePreview = filesImages.map((file) => (
    <div key={file.name} style={thumb}>
      <div className="thumb-inner">
        <img className="img" src={file.preview} />
      </div>
    </div>
  ));

  const showError = (errors, attribute) => (
    <ErrorMessage
      component={() => <Alert severity="warning">{errors[attribute]}</Alert>}
      name={attribute}
    />
  );

  useEffect(
    () => () => {
      filesImages.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [filesImages],
  );

  const handleClick = (values) => {
    let data = {
      name: values.name,
      description: activitiesDescription,
      image: base64ImageFile,
    };

    createOrUpdateActivity(id, data);
  };

  return (
    <Formik
      initialValues={formValues}
      validate={(values) => {
        let errors = {};

        if (!values.name) {
          errors.name = 'please submit a email';
        }
        if (!values.image) {
          errors.image = 'please submit a image';
        }

        return errors;
      }}
      onSubmit={(values) => {
        handleClick(values);
      }}>
      {({
        values,
        handleChange,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleReset,
      }) => {
        return (
          <Card sx={{ margin: '20px auto', width: '600px', height: '100%' }}>
            <CardHeader title={id ? 'EDIT ACTIVITY' : 'CREATE ACTIVITY'} />
            <Form
              sx={{
                padding: '60px',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '600px',
                height: '100%',
              }}
              onSubmit={handleSubmit}>
              <h4 className="title">Title</h4>
              <Field
                fullWidth
                component={TextField}
                error={Boolean(touched.name && errors.name)}
                id="name"
                label="Name"
                name="name"
                placeholder="Activity Title"
                sx={{ margin: '20px auto', width: '80%', display: 'flex' }}
                type="text"
                value={values.name}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors && showError(errors, 'name')}
              <h4 className="title">Description</h4>
              <section style={{ width: '80%', margin: '20px auto' }}>
                <CKEditor
                  required
                  data={activitiesDescription}
                  editor={ClassicEditor}
                  label="Description"
                  onChange={(e, editor) => handleCKeditorChange(e, editor)}
                />
              </section>
              <h4 className="title">Image</h4>
              <section className="form">
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  style={{ margin: '10px auto' }}>
                  <input
                    {...getInputProps({
                      onChange: handleChange,
                      id: 'image',
                      name: 'image',
                      error: errors.image,
                      value: values.image,
                      display: 'block',
                    })}
                  />
                  <p style={{ textAlign: 'center' }}>
                    Drag and drop some files here, or click to select files
                  </p>
                  <aside className="thumbs-container">{imagePreview}</aside>
                </div>
              </section>
              {errors && showError(errors, 'image')}
              <Button type="submit" variant="outlined">
                Send
              </Button>
            </Form>
          </Card>
        );
      }}
    </Formik>
  );
};

export default ActivitiesForm;
