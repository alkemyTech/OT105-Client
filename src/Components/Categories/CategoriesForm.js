import React, { useState, useEffect } from 'react';
import '../FormStyles.css';
import { useParams } from 'react-router';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//----------------------estilos-------------------------
const editorConfiguration = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'undo',
    'redo',
  ],
};

const datosForm = {
  category: '',
  title: '',
  content: '',
  image: '',
};

// ---------------estilo de dropzone------------------
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
  width: 100,
  height: 100,
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

//function especial
const CategoriesForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    image: '',
  });

  //*******************************react-DROPZONE *********************************************/
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jeg, image/png',
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
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
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

  //***************************************************HANDLES***************************************************************** */
  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setInitialValues({ ...initialValues, name: e.target.value });
    }
    if (e.target.name === 'description') {
      setInitialValues({ ...initialValues, description: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialValues);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>Categorias</h1>
      <input
        required
        className="input-field"
        minLength={4}
        name="name"
        placeholder="Title"
        type="text"
        value={initialValues.name}
        onChange={handleChange}
      />

      <CKEditor
        required
        data="<p>OT105-28!</p>"
        editor={ClassicEditor}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();

          console.log({ event, editor, data });
          setInitialValues({ ...initialValues, description: data });
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
      />
      <section className="input-field">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>

      <button className="submit-btn" type="submit">
        Send
      </button>
    </form>
  );
};

export default CategoriesForm;
