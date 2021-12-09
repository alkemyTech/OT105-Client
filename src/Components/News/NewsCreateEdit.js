//eslint-disable react-hooks/exhaustive-deps
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../../Components/FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDropzone } from 'react-dropzone';
import { categoriesGet } from '../../Services/CategoriesService';
import { urlEditNews, urlCreateNews } from '../../Services/NewsService';
import SlideHome from '../Slides/SlideHome';

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

const dataForm = {
  category: '',
  title: '',
  content: '',
  image: '',
};

const NewsCreateEdit = () => {
  const { id } = useParams();
  const [categories, setcategories] = useState([]);
  const [initialDataForm, setinitialDataForm] = useState(dataForm);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/png, image/jpg',
    onDrop: (acceptedFiles) => {
      setinitialDataForm({
        ...initialDataForm,
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
    <div key={file.name} className="thumb">
      <div className="thumbInner">
        <img alt="img not found" className="imgThumbs" src={file.preview} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  const onNewsDataChange = (e) => {
    if (e.target.name === 'title') {
      setinitialDataForm({ ...initialDataForm, title: e.target.value });
    } else if (e.target.name === 'category') {
      setinitialDataForm({ ...initialDataForm, category: e.target.value });
    }
  };

  const updateContentState = (e, editor) => {
    const data = editor.getData();

    setinitialDataForm({
      ...initialDataForm,
      content: data,
    });
  };

  const handleSubmit = (e) => {
    const dataWithTags = initialDataForm.content;
    const dataNoTags = dataWithTags.replace(/<[^>]+>/g, '');

    if (!id) {
      axios
        .post(urlCreateNews, {
          name: initialDataForm.title,
          image: initialDataForm.image,
          content: dataNoTags,
          category_id: initialDataForm.category,
        })
        .then((res) => {
          if (res.status === 200) {
            alert('news create successfulli');

            return setinitialDataForm(dataForm);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    if (id) {
      axios
        .put(urlEditNews, {
          name: initialDataForm.title,
          image: initialDataForm.image,
          content: dataNoTags,
          category_id: initialDataForm.category,
        })
        .then((res) => {
          if (res.status === 200) {
            alert('news updated successfulli');

            return setinitialDataForm(dataForm);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
    e.preventDefault();
  };

  const showCategoryOptions = () =>
    categories?.map((category) => (
      <option key={category.id} value={category.name}>
        {category.name}
      </option>
    ));

  useEffect(() => {
    const DatosEditNew = async () => {
      const DataInicialCategorie = await axios.get(categoriesGet),
        categorieData = await DataInicialCategorie.data.data;

      setcategories(categorieData);

      if (id) {
        const datosIniciales = await axios.get(urlEditNews),
          EditNewData = datosIniciales.data.data,
          { name, content } = await EditNewData;

        if (name) setinitialDataForm({ ...initialDataForm, title: name });
        if (content)
          setinitialDataForm({ ...initialDataForm, content: content });
      }
    };

    DatosEditNew();
  }, [categoriesGet]);

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="label-Title-New-News" htmlFor="title">
          <h2 className="titulo-Titulo-New-News">Title</h2>
          <input
            required
            className="input-field"
            name="title"
            type="text"
            value={initialDataForm.title || ''}
            onChange={onNewsDataChange}
          />
        </label>
        <h2 className="titulo-Content-New-News">Description</h2>
        <CKEditor
          config={editorConfiguration}
          data={initialDataForm.content}
          editor={ClassicEditor}
          onChange={updateContentState}
        />
        <h2 className="categorias-New-News">Category</h2>
        <select
          required
          className="select-field"
          name="category"
          value={initialDataForm.category || ''}
          onChange={onNewsDataChange}>
          <option value="">Select category</option>
          {showCategoryOptions()};
        </select>
        <section className="input-field">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag n drop some files here, or click to select files</p>
          </div>
          <aside className="thumbsContainer">{thumbs}</aside>
        </section>
        <button className="submit-btn" type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default NewsCreateEdit;
