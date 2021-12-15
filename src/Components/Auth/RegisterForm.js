import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import s from '../../assets/terms_and_conditions.pdf';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import '../FormStyles.css';
import RestoreIcon from '@mui/icons-material/Restore';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const RegisterForm = () => {
  const [initialValues, setInitialValues] = useState({
    name: '',
    lastName: '',
  });

  const [open, setOpen] = React.useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const previousPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const nextPage = () => {
    if (pageNumber === numPages) return;
    setPageNumber(pageNumber + 1);
  };

  const handleClose = (e) => {
    if (e.target.textContent === 'Aceptar') {
      console.log('Términos aceptados');
    } else {
      console.log('Términos rechazados');
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setInitialValues({ ...initialValues, name: e.target.value });
    }
    if (e.target.name === 'lastName') {
      setInitialValues({ ...initialValues, lastName: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    localStorage.setItem('token', 'tokenValueExample');
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-field"
          name="name"
          placeholder="Enter name"
          type="text"
          value={initialValues.name}
          onChange={handleChange}
        />
        <input
          className="input-field"
          name="lastName"
          placeholder="Enter last name"
          type="text"
          value={initialValues.lastName}
          onChange={handleChange}
        />
        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>
      <Dialog
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        open={open}
        onClose={handleClose}>
        <DialogTitle>{'¿Acepta los términos y condiciones?'}</DialogTitle>
        <DialogContent>
          <Document file={s} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} scale={0.7} />
          </Document>
        </DialogContent>
        <BottomNavigation showLabels sx={{ position: 'absolute', bottom: '0' }}>
          <BottomNavigationAction
            icon={<ArrowBackIosNewIcon />}
            label="Prev"
            onClick={previousPage}
          />
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <BottomNavigationAction
            icon={<ArrowForwardIosIcon />}
            label="Next"
            onClick={nextPage}
          />
        </BottomNavigation>
        <DialogActions>
          <Button onClick={(e) => handleClose(e)}>Rechazar</Button>
          <Button onClick={(e) => handleClose(e)}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterForm;
