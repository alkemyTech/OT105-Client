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
import { dropzoneConfig, isEmptyList } from '../../utils/index';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import '../FormStyles.css';
import '../../Styles/ProjectsForm.css';

const ProjectsForm = ({ id }) => {
  const [projectFormValues, setProjectFormValues] = useState({
    name: id ? id.data.name : '',
    description: id ? id.data.description : '',
    dueDate: id ? id.data.dueDate : '',
    image: id ? id.data.name : null,
  });
  const [description, setDescription] = useState('');
  const [filesImages, setFilesImages] = useState([]);
  const { multipleFiles, maxFiles, validImages } = dropzoneConfig;
  const [base64ImageFile, setBase64ImageFile] = useState('');
  const handleDrop = (acceptedFiles, fileRejections) => {
    const imageFileWithPreview = imagePreview(acceptedFiles);

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

  const imagePreview = filesImages.map((file) => (
    <div key={file.name} className="image-preview">
      <div className="thumb-inner">
        <img className="img" src={file.preview} />
      </div>
    </div>
  ));

  const { getRootProps, getInputProps } = useDropzone({
    multiple: multipleFiles,
    maxFiles: maxFiles,
    accept: validImages,
    onDrop: (acceptedFiles, fileRejections) =>
      handleDrop(acceptedFiles, fileRejections),
  });

  const avoidMemoryLeaks = () =>
    filesImages.forEach((file) => URL.revokeObjectURL(file.preview));

  useEffect(
    () => () => {
      avoidMemoryLeaks();
    },
    [filesImages],
  );

  const handleCKeditorChange = (e, editor) => {
    const data = editor.getData();

    setDescription(data);
  };

  const handleClick = (values) => {
    let data = {
      name: values.name,
      description: description,
      dueDate: values.dueDate,
      image: base64ImageFile,
    };

    Swal.fire('Good job!', 'You clicked the button!', 'success');
    if (id) {
      Axios.patch(`http://ongapi.alkemy.org/api/categories/${id}`, data).then(
        () => {
          Swal.fire('success');
        },
      );
    } else {
      Axios.post('http://ongapi.alkemy.org/api/categories/', data).then(() => {
        Swal.fire('success');
      });
    }
  };

  return (
    <Formik
      initialValues={projectFormValues}
      validate={(values) => {
        let errors = {};

        if (!values.name) {
          errors.name = 'Please submit a email';
        }
        if (!base64ImageFile) {
          errors.image = 'Please submit a image';
        }
        if (!values.description) {
          errors.description = 'Please submit a description';
        }

        return errors;
      }}
      onSubmit={(values) => {
        handleClick(values);
      }}>
      {({ values, handleChange, errors, touched, handleBlur }) => {
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
              }}>
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
              <ErrorMessage
                component={() => (
                  <Alert severity="warning">{errors.name}</Alert>
                )}
                name="name"
              />
              <h4 className="title">Description</h4>
              <section style={{ width: '80%', margin: '20px auto' }}>
                <CKEditor
                  required
                  component={TextField}
                  data={description}
                  editor={ClassicEditor}
                  label="Description"
                  onChange={(e, editor) => handleCKeditorChange(e, editor)}
                />
              </section>
              <ErrorMessage
                component={() => (
                  <Alert severity="warning">{errors.description}</Alert>
                )}
                name="name"
              />
              <h4 className="title">Due date</h4>
              <Field
                component={TextField}
                sx={{ margin: '20x auto', display: 'flex', width: '200px' }}
                type="date"
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
                  <aside className="thumbs-container">{imagePreview}</aside>
                </div>
              </section>
              <ErrorMessage
                component={() => (
                  <Alert severity="warning">{errors.image}</Alert>
                )}
                name="image"
              />
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
