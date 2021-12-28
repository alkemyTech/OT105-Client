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
import { createOrEditTestimonial } from '../../Services/MemberServices';
import thumb from './membersCreateEdit.module.css';

function MembersCreateEdit() {
  const { id } = useParams();
  const [apiResponse, setApiResponse] = useState({});
  const [formValues, setFormValues] = useState({
    name: '',
    image: '',
    description: '',
    facebookUrl: '',
    linkedinUrl: '',
  });

  const [dropZoneFiles, setDropZoneFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpg',
    onDrop: (acceptedFiles) => {
      setFormValues({
        ...formValues,
        image: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      });
      setDropZoneFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  const thumbs = dropZoneFiles.map((file) => (
    <div key={file.name} style={thumb}>
      <div className="thumb-inner">
        <img className="img" src={file.preview} />
      </div>
    </div>
  ));
  const avoidMemoryLeak = () =>
    dropZoneFiles.forEach((file) => URL.revokeObjectURL(file.preview));

  useEffect(
    () => () => {
      avoidMemoryLeak();
    },
    [dropZoneFiles],
  );
  const showErrorMessage = (errorMessage) => {
    return <Alert severity="warning"> {errorMessage} </Alert>;
  };

  const descriptionChange = (e, editor) => {
    const data = editor.getData();

    setFormValues({ ...formValues, description: data });
  };
  const nameChange = (e, values) => {
    // eslint-disable-next-line no-console
    console.log(values);
    setFormValues({ ...formValues, name: e.target.value });
  };
  const facebookChange = (e) => {
    setFormValues({ ...formValues, facebookUrl: e.target.value });
  };
  const linkedInChange = (e) => {
    setFormValues({ ...formValues, linkedinUrl: e.target.value });
  };
  const handleClick = () => {
    const dataTags = formValues.description;
    const cleanTags = dataTags.replace(/<[^>]+>/g, '');
    const body = {
      name: formValues.name,
      image: formValues.image,
      description: cleanTags,
      facebookUrl: formValues.facebookUrl,
      linkedinUrl: formValues.linkedinUrl,
    };

    createOrEditTestimonial(id, body).then((resp) => setApiResponse(resp.data));
  };

  return (
    <Formik
      formValues={{
        name: '',
        image: '',
        description: '',
        facebookUrl: '',
        linkedinUrl: '',
      }}
      validate={(values) => {
        let errors = {};

        if (!values.name) {
          errors.name = 'Please submit a email';
        }

        if (values.image === null) {
          errors.image = 'Please submit a image';
        } else if (values.image) {
          errors.image = false;
        }

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
                value={formValues.name}
                onChange={(e, values) => nameChange(e, values)}
              />
              {errors.name && showErrorMessage(errors.name)}
              <h4 className="name">Description</h4>
              <section style={{ width: '80%', margin: '20px auto' }}>
                <CKEditor
                  required
                  component={TextField}
                  data={formValues.description}
                  editor={ClassicEditor}
                  label="Description"
                  onChange={descriptionChange}
                />
              </section>
              {errors.description && showErrorMessage(errors.description)}
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
              {errors.image && showErrorMessage(errors.image)}
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
                value={formValues.facebookUrl}
                variant="outlined"
                onChange={(e, value) => facebookChange(e, value)}
              />
              {errors.facebookUrl && showErrorMessage(errors.facebookUrl)}
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
                value={formValues.linkedinUrl}
                variant="outlined"
                onChange={linkedInChange}
              />
              {errors.linkedinUrl && showErrorMessage(errors.linkedinUrl)}
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
