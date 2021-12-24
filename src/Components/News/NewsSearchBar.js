import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const NewsSearchBar = () => {
  const inputSchema = Yup.object({
    input: Yup.string().required('Campo requerido'),
  });

  const formik = useFormik({
    initialValues: {
      input: '',
    },
    validationSchema: inputSchema,
    onSubmit: async (values) => {
      await axios
        .get(`http://ongapi.alkemy.org/api/news/?search=${values.input}`)
        .then((res) => console.log(res.data.data));
    },
  });

  return (
    <Paper
      component="form"
      noValidate
      onSubmit={formik.handleSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        margin: 'auto',
      }}>
      <TextField
        sx={{ ml: 1, flex: 1 }}
        id="input"
        required
        name="input"
        error={formik.errors.input}
        helperText={formik.errors.input}
        onChange={formik.handleChange}
        value={formik.values.input}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default NewsSearchBar;
