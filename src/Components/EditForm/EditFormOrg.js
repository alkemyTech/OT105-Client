import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import validate from './validate';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CloseIcon from '@mui/icons-material/Close';
function EditFormOrg() {
  const [open, setOpen] = useState(true);

  const Edit = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: 'image/jpeg, image/png',
      onDrop: (acceptedFiles) => {
        console.log(acceptedFiles);
      },
    });
    const files = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
    const handleChange = (e, editor) => {
      const data = editor.getData();

      formik.setFieldValue('shortDescription', data);
    };

    const formik = useFormik({
      initialValues: {
        name: '',
        logo: '',
        shortDescription: '',
        longDescription: '',
        link1: '',
        link2: '',
        link3: '',
      },
      validate,
      onSubmit: (values) => {},
    });

    const showErrors = (errorAttribute) => {
      if (formik.touched[errorAttribute] && formik.errors[errorAttribute]) {
        return (
          <Alert
            align="justify"
            severity="warning"
            sx={{ width: '23rem', height: '2rem' }}>
            <AlertTitle> {formik.errors[errorAttribute]} </AlertTitle>
          </Alert>
        );
      }
    };
    const showErrorCollapse = (errorAttribute) => {
      if (formik.touched[errorAttribute] && formik.errors[errorAttribute]) {
        return (
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              align="justify"
              severity="warning"
              sx={{ width: '23rem' }}>
              <AlertTitle>Warning</AlertTitle>
              {formik.errors[errorAttribute]}
            </Alert>
          </Collapse>
        );
      }
    };

    return (
      <form className="formEditOrg" onSubmit={formik.handleSubmit}>
        <FormControl margin="dense">
          <InputLabel htmlFor="name">Company name</InputLabel>
          <Input
            id="name"
            margin="dense"
            name="name"
            sx={{ width: '25rem' }}
            type="text"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {showErrors('name')}
        </FormControl>
        <InputLabel>Logo</InputLabel>
        <FormControl>
          <div {...getRootProps()}>
            <input
              id="logo"
              name="logo"
              value={formik.values.logo}
              onChange={formik.handleChange}
              {...getInputProps()}
              onBlur={formik.handleBlur}
            />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
          {showErrorCollapse('logo')}
        </FormControl>
        <Container sx={{ width: '28rem' }}>
          <CKEditor
            required
            data={formik.values.shortDescription}
            editor={ClassicEditor}
            id="shortDescription"
            name="shortDescription"
            type="text"
            onChange={formik.handleChange}
          />
          {showErrors('shortDescription')}
        </Container>
        <FormControl margin="dense">
          <TextField
            multiline
            id="longDescription"
            name="longDescription"
            placeholder="Long description"
            rows={4}
            sx={{ width: '25rem' }}
            type="text"
            value={formik.values.longDescription}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {showErrors('longDescription')}
        </FormControl>
        <InputLabel> social media links</InputLabel>
        <FormControl margin="dense">
          <TextField
            id="link1"
            margin="dense"
            name="link1"
            placeholder="link1"
            size="small"
            sx={{ width: '25rem' }}
            type="url"
            value={formik.values.link1}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {showErrors('link1')}
          <TextField
            id="link2"
            margin="dense"
            name="link2"
            placeholder="link2"
            size="small"
            sx={{ width: '25rem' }}
            type="url"
            value={formik.values.link2}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {showErrors('link2')}
          <TextField
            id="link3"
            margin="dense"
            name="link3"
            placeholder="link3"
            size="small"
            sx={{ width: '25rem' }}
            type="url"
            value={formik.values.link3}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {showErrors('link3')}
        </FormControl>
        <Button className="btn" type="submit" variant="contained">
          {' '}
          submit
        </Button>
      </form>
    );
  };

  return (
    <Container maxWidth="sm">
      <Edit />
    </Container>
  );
}
export default EditFormOrg;
/* 
{formik.touched.logo && formik.errors.logo ? (
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}>
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                align="justify"
                severity="warning"
                sx={{ width: '23rem' }}>
                <AlertTitle>Warning</AlertTitle>
                {formik.errors.logo}
              </Alert>
            </Collapse>
          ) : null}
*/
