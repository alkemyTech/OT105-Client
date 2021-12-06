import React from 'react';
import Box from '@mui/material/Box';

const HomeScreen = () => {
  return (
    <Box
      sx={{
        width: '99.9%',
        textAlign: 'center',
        height: '100vh',
        border: '1px solid',
        overflow: 'hidden',
      }}>
      <div style={{ objectFit: 'fill' }}>
        <img src="https://picsum.photos/2500/400" />
      </div>
      <h1>Texto de bienvenida</h1>
    </Box>
  );
};

export default HomeScreen;
