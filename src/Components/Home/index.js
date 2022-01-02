import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography, Paper } from '@mui/material';
import Title from '../Title/Title';
import { getWelcomeMessage } from '../../Services/homeService';
import Seccion_Novedades from '../News/Seccion_Novedades';
import Testimonials from '../Testimonials/Testimonials';

const HomeScreen = () => {
  const [title, setTitle] = useState(null);

  useEffect(() => {
    getWelcomeMessage().then((message) => {
      setTitle(message);
    });
  }, []);

  return (
    <>
      <Title
        bckgOpacity="0.5"
        imageUrl="https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        titlePadding="13rem"
        titleText={title}
      />
      <Box
        sx={{
          width: '99.9%',
          textAlign: 'center',
          minHeight: '100vh',
          overflow: 'hidden',
          background: '#EDF2F7',
        }}>
        <div name="sliders" />
        <Container sx={{ marginTop: '50px' }}>
          <Box sx={{ objectFit: 'contain' }}>
            {/* <Typography variant="h4">Últimas novedades</Typography>
            <div name="news" /> */}
            <Paper sx={{ marginBlock: '2rem', paddingBottom: '2rem' }}>
              <Seccion_Novedades />
            </Paper>
            <Paper sx={{ marginBlock: '2rem', paddingBottom: '2rem' }}>
              <Testimonials />
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomeScreen;
