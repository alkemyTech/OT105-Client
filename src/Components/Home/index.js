import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Title from '../Title/Title';
import { getWelcomeMessage } from '../../Services/homeService';

const HomeScreen = () => {
  const [title, setTitle] = useState(null);

  useEffect(() => {
    getWelcomeMessage().then((message) => {
      setTitle(message);
    });
  }, []);

  return (
    <>
      <Title titleText={title} />
      <Box
        sx={{
          width: '99.9%',
          textAlign: 'center',
          minHeight: '100vh',
          overflow: 'hidden',
        }}>
        <div name="sliders" />
        <Container sx={{ marginTop: '50px' }}>
          <Box sx={{ objectFit: 'contain' }}>
            <Typography variant="h4">Últimas novedades</Typography>
            <div name="news" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeScreen;
