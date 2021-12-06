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
        height: '100vh',
        overflow: 'hidden',
      }}>
      <div>
        <img fit="cover" src="https://picsum.photos/3200/700" width="100%" />
      </div>
      <Container sx={{ marginTop: '20px' }}>
        <Typography variant="h3">Texto de bienvenida</Typography>
      </Container>
      <Container sx={{ border: '1px solid', marginTop: '50px' }}>
        <Box sx={{ objectFit: 'fill' }}>
          <Typography variant="h4">Últimas novedades</Typography>
          <img src="https://picsum.photos/1500/500" width="100%" />
        </Box>
      </Container>
    </Box>
  );
};

export default HomeScreen;
