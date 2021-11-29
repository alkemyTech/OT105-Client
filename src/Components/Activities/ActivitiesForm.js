import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import '../FormStyles.css';
import '../../Styles/ActivitiesForm.css';

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
  const [initialValues, setInitialValues] = useState({
    name: id ? id.data.name : '',
    description: id ? id.data.description : '',
    image: id ? id.data.name : null,
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      setInitialValues({
        ...initialValues,
        image: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      });

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} style={thumb}>
      <div className="thumb-inner">
        <img className="img" src={file.preview} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  const handleClick = (values) => {
    let data = {
      name: values.name,
      description: values.description,
      image: values.image,
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
      initialValues={initialValues}
      validate={(values) => {
        let errors = {};

        //Name
        if (!values.name) {
          errors.name = 'please submit a email';
        }
        //Image
        if (values.image === null) {
          errors.image = 'please submit a image';
        } else if (values.image) {
          errors.image = false;
        }

        return errors;
      }}
      onSubmit={(values) => {
        handleClick(values);
      }}>
      {({ values, handleChange, errors, touched, handleBlur }) => {
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
                component={() => <span className="error">{errors.name}</span>}
                name="name"
              />
              <h4 className="title">Description</h4>
              <section style={{ width: '80%', margin: '20px auto' }}>
                <CKEditor
                  required
                  data={initialValues.description}
                  editor={ClassicEditor}
                  label="Description"
                  onReady={(editor) => {
                    // eslint-disable-next-line no-console
                    console.log('Editor is ready to use!', editor);
                  }}
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
                  <aside className="thumbs-container">{thumbs}</aside>
                </div>
              </section>
              <ErrorMessage
                component={() => <span className="error">{errors.image}</span>}
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

export default ActivitiesForm;
