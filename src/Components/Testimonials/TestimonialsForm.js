import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useFormik } from 'formik';
import axios from 'axios';
import { TextField, Box, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import '../FormStyles.css';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const TestimonialForm = ({ id }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const getTestimonials = () => {
    return {
      name: 'Testimonial testings',
      description: 'This is a mockup testimonial',
      image: '',
    };
  };

  useEffect(() => {
    if (id) {
      const resp = getTestimonials();

      setName(resp.name);
      setDescription(resp.description);
    }
  }, []);

  const handleInputChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
  };

  const validate = () => {
    const errors = {};

    if (!name) {
      errors.name = 'El nombre es requerido';
    } else if (name.length < 4) {
      errors.name = 'El nombre debe contener al menos 4 caracteres';
    }
    if (!description) {
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

  const handleCKeditorChange = (e, editor) => {
    const data = editor.getData();

    setDescription(data);
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    accept: 'image/jpeg, image/png',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      const reader = new FileReader();

      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {
        const base64 = reader.result;

        setImage(base64);
      };
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} style={thumb}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const handleSubmit = async () => {
    const body = {
      name,
      description,
      image,
    };

    let resp;

    id
      ? (resp = await axios.patch(
          `http://ongapi.alkemy.org/api/testimonials/${id}`,
          body,
        ))
      : (resp = await axios.post(
          'http://ongapi.alkemy.org/api/testimonials/',
          body,
        ));
  };

  return (
    <Box
      noValidate
      className="form-container"
      component="form"
      onSubmit={formik.handleSubmit}>
      <TextField
        label="Titulo"
        name="name"
        type="text"
        value={name}
        variant="outlined"
        onChange={handleInputChange}
      />
      <CKEditor
        data={description}
        editor={ClassicEditor}
        onChange={(e, editor) => handleCKeditorChange(e, editor)}
      />
      <Box
        component="div"
        style={{ border: '1px solid lightgray', paddingBottom: '15px' }}
        {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Arrastra una imagen o haz click aqui para agregarla </p>
        <p>(Solo archivos .jpg o .png)</p>
      </Box>
      <aside style={thumbsContainer}>{thumbs}</aside>

      <Button type="submit" variant="outlined">
        Enviar
      </Button>
    </Box>
  );
};

export default TestimonialForm;
