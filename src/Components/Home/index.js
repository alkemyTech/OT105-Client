import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

const HomeScreen = () => {
  return (
    <Box
      sx={{
        width: '99.9%',
        textAlign: 'center',
        minHeight: '100vh',
        overflow: 'hidden',
      }}>
      {/* Slider component */}
      <Box
        sx={{
          width: '100%',
          objectFit: 'fill',
          height: '500px',
          overflow: 'hidden',
        }}>
        <img src="https://picsum.photos/3200/1500" width="100%" />
      </Box>
      <Container sx={{ marginTop: '20px' }}>
        <Typography variant="h3">Texto de bienvenida</Typography>
      </Container>
      <Container sx={{ marginTop: '50px' }}>
        <Box sx={{ objectFit: 'contain' }}>
          <Typography variant="h4">Últimas novedades</Typography>
          {/* UltimasNovedades Component */}
          <img src="https://picsum.photos/1500/800" width="100%" />
        </Box>
      </Container>
    </Box>
  );
};

export default HomeScreen;
