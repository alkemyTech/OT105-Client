import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import { Alert } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { dropzoneConfig, isEmptyList } from '../../Utils/index';
import { createOrUpdateProject } from '../../Services/projectService';
import { useDropzone } from 'react-dropzone';
import '../FormStyles.css';
import '../../Styles/ProjectsForm.css';

const ProjectsForm = ({ id }) => {
  const [projectDueDate, setProjectDueDate] = useState('');

  const [projectFormValues, setProjectFormValues] = useState({
    name: id ? id.data.name : '',
    description: id ? id.data.description : '',
    dueDate: id ? id.data.dueDate : '',
    image: id ? id.data.name : null,
  });
  const [filesImages, setFilesImages] = useState([]);
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const [projectsDescription, setProjectsDescription] = useState('');
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

  const { getRootProps, getInputProps } = useDropzone({
    multiple: multipleFiles,
    maxFiles: maxFiles,
    accept: validImages,
    onDrop: (acceptedFiles, fileRejections) =>
      handleDrop(acceptedFiles, fileRejections),
  });

  const imagePreview = filesImages.map((file) => (
    <div key={file.name} className="image">
      <div className="image-inner">
        <img className="preview-image" src={file.preview} />
      </div>
    </div>
  ));

  const avoidMemoryLeaks = () =>
    filesImages.forEach((file) => URL.revokeObjectURL(file.preview));

  const showError = (errors, attribute, type) => (
    <ErrorMessage
      component={() => <Alert severity="warning">{errors[attribute]}</Alert>}
      name={attribute}
    />
  );

  useEffect(
    () => () => {
      avoidMemoryLeaks();
    },
    [filesImages],
  );

  const handleCKeditorChange = (e, editor) => {
    let dataDescription = editor.getData();

    setProjectsDescription(dataDescription);

    console.log(dataDescription);
  };

  const handleDueDateChange = (e, value) => {
    setProjectDueDate(e.target.value);
    console.log(projectDueDate);
  };

  const handleClick = (values) => {
    let newFormValues = {
      name: values.name,
      description: projectsDescription,
      dueDate: JSON.stringify(projectDueDate),
      image: base64ImageFile,
    };

    createOrUpdateProject(id, newFormValues);
  };

  return (
    <Formik
      initialValues={projectFormValues}
      validate={(values) => {
        let errors = {};

        if (!values.name) {
          errors.name = 'These camps are required';
        }
        if (!values.image) {
          errors.image = 'Please submit a image';
        }
        if (!projectsDescription) {
          errors.description = 'These camps are required';
        }

        return errors;
      }}
      onSubmit={(values) => {
        handleClick(values);
      }}>
      {({ values, handleChange, errors, handleSubmit }) => {
        return (
          <Card sx={{ margin: '20px auto', width: '600px', height: '100%' }}>
            <CardHeader title={id ? 'EDIT PROJECT' : 'CREATE PROJECT'} />
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
                error={errors.name}
                id="name"
                label="Name"
                name="name"
                placeholder="Activity Title"
                sx={{ margin: '20px auto', width: '80%', display: 'flex' }}
                type="text"
                value={values.name}
                variant="outlined"
                onChange={handleChange}
              />
              {errors.name && showError(errors, 'name')}
              <h4 className="title">Description</h4>
              <section style={{ width: '80%', margin: '20px auto' }}>
                <CKEditor
                  editor={ClassicEditor}
                  errors={errors.description}
                  id="description"
                  label="description"
                  name="description"
                  data={values.description}
                  onChange={(e, editor) => {
                    handleCKeditorChange(e, editor);
                  }}
                />
              </section>
              {errors.description && showError(errors, 'description')}
              <h4 className="title">Due date</h4>
              <Field
                component={TextField}
                sx={{ margin: '20x auto', display: 'flex', width: '200px' }}
                type="date"
                data={values.dueDate}
                onChange={(e, data) => {
                  handleDueDateChange(e, data);
                }}
              />
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
                  <aside className="image-container">{imagePreview}</aside>
                </div>
              </section>
              {errors.image && showError(errors, 'image')}
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

export default ProjectsForm;
