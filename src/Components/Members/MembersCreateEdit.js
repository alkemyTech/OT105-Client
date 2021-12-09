import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import { Alert } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  margin: 'auto',
  width: 'auto',
  height: 60,
  padding: 4,
  boxSizing: 'border-box',
};

function MembersCreateEdit() {
  const { id } = useParams();
  const urlEdit = `http://ongapi.alkemy.org/public/api/members/${id}`;
  const urlCreate = `http://ongapi.alkemy.org/public/api/members`;
  const [initialValues, setInitialValues] = useState({
    name: '',
    image: '',
    description: '',
    facebookUrl: '',
    linkedinUrl: '',
  });

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpg',
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

  const descriptionChange = (e, editor) => {
    const data = editor.getData();

    setInitialValues({ ...initialValues, description: data });
  };
  const nameChange = (e, values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    setInitialValues({ ...initialValues, name: e.target.value });
  };
  const facebookChange = (e) => {
    setInitialValues({ ...initialValues, facebookUrl: e.target.value });
  };
  const linkedInChange = (e) => {
    setInitialValues({ ...initialValues, linkedinUrl: e.target.value });
  };
  const handleClick = () => {
    const datosConEtiquetas = initialValues.description;
    const datosSinEtiquetas = datosConEtiquetas.replace(/<[^>]+>/g, '');

    if (!id) {
      axios
        .post(urlCreate, {
          name: initialValues.name,
          image: initialValues.image,
          description: datosSinEtiquetas,
          facebookUrl: initialValues.facebookUrl,
          linkedinUrl: initialValues.linkedinUrl,
        })
        .then((response) => {
          if (response.status === 200) {
            // eslint-disable-next-line no-console
            alert('Create member successfully');

            return initialValues;
          }
        })
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e));
    }
    if (id) {
      axios
        .post(urlEdit, {
          name: initialValues.name,
          image: initialValues.image,
          description: datosSinEtiquetas,
          facebookUrl: initialValues.facebookUrl,
          linkedinUrl: initialValues.linkedinUrl,
        })
        .then((response) => {
          if (response.status === 200) {
            // eslint-disable-next-line no-console
            alert('Edit member successfully');

            return setInitialValues(initialValues);
          }
        })
        .catch((e) => alert(e));
    }
  };

  useEffect(() => {
    const dataEdit = async () => {
      if (id) {
        const initialData = await axios.get(urlEdit),
          { name, image, description, facebookUrl, linkedinUrl } =
            initialData.data.data;

        if (name) setInitialValues({ ...initialValues, name: name });
        if (image) setInitialValues({ ...initialValues, image: image });
        if (description)
          setInitialValues({ ...initialValues, description: description });
        if (facebookUrl)
          setInitialValues({ ...initialValues, facebookUrl: facebookUrl });
        if (linkedinUrl)
          setInitialValues({ ...initialValues, linkedinUrl: linkedinUrl });
      }
    };

    dataEdit();
  });

  return (
    <Formik
      initialValues={{
        name: '',
        image: '',
        description: '',
        facebookUrl: '',
        linkedinUrl: '',
      }}
      validate={(values) => {
        let errors = {};

        //Name
        if (!values.name) {
          errors.name = 'Please submit a email';
        }
        //Image
        if (values.image === null) {
          errors.image = 'Please submit a image';
        } else if (values.image) {
          errors.image = false;
        }
        //Description
        if (!values.description) {
          errors.description = 'Please submit a description';
        }
      }}
      onSubmit={(values) => {
        handleClick(values);
      }}>
      {({ errors, touched }) => {
        return (
          <Card sx={{ margin: '20px auto', width: '600px', height: '100%' }}>
            <CardHeader title={id ? 'EDIT MEMBER' : 'CREATE MEMBER'} />
            <Form
              sx={{
                padding: '60px',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '600px',
                height: '100%',
              }}>
              <h4 className="title">Name</h4>
              <Field
                fullWidth
                component={TextField}
                error={Boolean(touched.name && errors.name)}
                id="name"
                label="Name"
                name="name"
                placeholder="complet name"
                type="text"
                value={initialValues.name}
                onChange={(e, values) => nameChange(e, values)}
              />
              <ErrorMessage
                component={() => (
                  <Alert severity="warning">{errors.name}</Alert>
                )}
                name="name"
              />
              <h4 className="name">Description</h4>
              <section style={{ width: '80%', margin: '20px auto' }}>
                <CKEditor
                  required
                  component={TextField}
                  data={initialValues.description}
                  editor={ClassicEditor}
                  label="Description"
                  onChange={descriptionChange}
                />
              </section>
              <ErrorMessage
                component={() => (
                  <Alert severity="warning">{errors.description}</Alert>
                )}
                name="name"
              />
              <h4 className="title">Image</h4>
              <section className="form">
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  style={{ margin: '10px auto' }}>
                  <input
                    {...getInputProps({
                      id: 'image',
                      name: 'image',
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
                component={() => (
                  <Alert severity="warning">{errors.image}</Alert>
                )}
                name="image"
              />
              <h4 className="title">facebookUrl</h4>
              <Field
                fullWidth
                component={TextField}
                error={Boolean(touched.facebookUrl && errors.facebookUrl)}
                id="facebookUrl"
                label="facebookUrl"
                name="facebookUrl"
                placeholder="facebookUrl"
                sx={{ margin: '20px auto', width: '80%', display: 'flex' }}
                type="text"
                value={initialValues.facebookUrl}
                variant="outlined"
                onChange={(e, value) => facebookChange(e, value)}
              />
              <ErrorMessage
                component={() => (
                  <Alert severity="warning">{errors.facebookUrl}</Alert>
                )}
                name="facebookUrl"
              />
              <h4 className="title">linkedinUrl</h4>
              <Field
                fullWidth
                component={TextField}
                error={Boolean(touched.linkedinUrl && errors.linkedinUrl)}
                id="linkedinUrl"
                label="linkedinUrl"
                name="linkedinUrl"
                placeholder="linkedinUrl"
                sx={{ margin: '20px auto', width: '80%', display: 'flex' }}
                type="text"
                value={initialValues.linkedinUrl}
                variant="outlined"
                onChange={linkedInChange}
              />
              <ErrorMessage
                component={() => (
                  <Alert severity="warning">{errors.linkedinUrl}</Alert>
                )}
                name="linkedinUrl"
              />
              <Button
                className="submit-btn"
                type="submit"
                variant="contained"
                onClick={() => handleClick()}>
                Send
              </Button>
            </Form>
          </Card>
        );
      }}
    </Formik>
  );
}

export default MembersCreateEdit;
