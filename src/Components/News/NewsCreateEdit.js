/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../../Components/FormStyles.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDropzone} from 'react-dropzone';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


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
        'redo'
    ]
};

const datosForm = {
    category: '',
    title: '',
    content: '',
    image: '',
}
//dropzone--------------------------------
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
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
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

function NewsCreateEdit() {
    
    const { id } = useParams() //Esto valida si se esta editando o creando un post mediante paso de parametros
    //const refP = useRef() //cambia la visibilidad del <p> "insertar imagen"
    const urlCategoria = 'http://ongapi.alkemy.org/public/api/categories';
    const urlEditarNovedad = `http://ongapi.alkemy.org/public/api/news/${id}`
    const urlCrearNovedad = 'http://ongapi.alkemy.org/public/api/news'
    const [categorias, setcategorias] = useState([]) //obtiene las categorias del endpoint
    const [initialValues, setInitialValues] = useState(datosForm);
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/png, image/jpg',
      onDrop: acceptedFiles => {
        setInitialValues({...initialValues, image: (acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))})
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
    
    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            alt='img not found'
          />
        </div>
      </div>
    ));
  
    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handleChange = (e) => { //actualiza el estado de title y category
        if (e.target.name === 'title') {
            setInitialValues({ ...initialValues, title: e.target.value })
        } if (e.target.name === 'category') {
            setInitialValues({ ...initialValues, category: e.target.value })
        }
    }

   
    const contentChange = (e, editor) => { //actualiza el estado de content
        const data = editor.getData()
        setInitialValues({
            ...initialValues, content: data
        })
    }

    const handleSubmit = (e) => { //envia los datos dependiendo del id hace una peticion post o put
        const datosConEtiquetas = initialValues.content
        const datosSinEtiquetas = datosConEtiquetas.replace(/<[^>]+>/g, ''); //convierte a texto plano el content

        if (!id) {
            axios.post(urlCrearNovedad, {
                name: initialValues.title,
                image: initialValues.image,
                content: datosSinEtiquetas,
                category_id: initialValues.category
            }).then(res => {
                if (res.status === 200) {
                    alert("news create successfulli");
                    return setInitialValues(datosForm)
                }
            }).catch(err => {
                alert(err)
            })
        }
        if (id) {
            axios.put(urlEditarNovedad, {
                name: initialValues.title,
                image: initialValues.image,
                content: datosSinEtiquetas,
                category_id: initialValues.category
            }).then(res => {
                if (res.status === 200) {
                    alert("news updated successfulli");
                    return setInitialValues(datosForm)
                }
            }).catch(err => {
                alert(err)
            })
        }
        e.preventDefault();
        console.log(initialValues);
    }

    useEffect(() => {

        const DatosEditNew = async () => {
            const DataInicialCategoria = await axios.get(urlCategoria),
                categoriaData = await DataInicialCategoria.data.data;
            setcategorias(categoriaData)

            if (id) {
                const datosIniciales = await axios.get(urlEditarNovedad),
                    EditNewData = datosIniciales.data.data,
                    { name, content } = await EditNewData
                if (name) setInitialValues({ ...initialValues, title: name })
                if (content) setInitialValues({ ...initialValues, content: content })
            }

        }

        DatosEditNew()
    }, [urlCategoria])

    return (
        
        <>
            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="title" className='label-Title-New-News'>
                    <h2 className="titulo-Titulo-New-News">Title</h2>
                    <input
                        required
                        className="input-field"
                        type="text"
                        name="title"
                        value={initialValues.title || ''}
                        onChange={handleChange}
                    ></input>
                </label>
                <h2 className="titulo-Content-New-News">Description</h2>
                <CKEditor 
                    config={editorConfiguration}
                    editor={ClassicEditor}
                    data={initialValues.content}
                    onChange={contentChange}
                />
                <h2 className="categorias-New-News">Category</h2>
                <select
                    required
                    className="select-field"
                    name="category"
                    value={initialValues.category || ''}
                    onChange={handleChange}
                >
                    <option value="">Select category</option>
                    {
                        categorias?.map((e) => {
                            return <option key={e.id} value={e.name}>{e.name}</option>
                        })
                    }
                </select>
                <section className="input-field">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
                </section>
                <button className="submit-btn" type="submit">Send</button>
            </form>
        </>
    );
}

export default NewsCreateEdit;