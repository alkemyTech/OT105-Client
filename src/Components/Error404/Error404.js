import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import image404 from '../../assets/img/404Error-somosMas.svg';

const Error404 = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%', display: 'flex' }}>
        <Box sx={{ flex: '0 0 60%' }}>
          <img src={image404} alt="404" />
        </Box>
        <Box>Pagina no encontrada...</Box>
      </Box>
    </Container>
  );
};

export default Error404;
