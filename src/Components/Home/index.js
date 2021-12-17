import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Title from '../Title/Title';
import LoaderSpinner from '../CommonComponents/LoaderSpinner';
import { errorAlert } from '../../Services/alertsService';

const HomeScreen = () => {
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const titleMockup = 'Home Component';

  const loader = () => {
    try {
      setTimeout(() => setLoading(false), 2000);
    } catch {
      errorAlert();
      setError(true);
    }
  };

  useEffect(() => {
    setTitle(titleMockup);
    loader();
  }, []);

  return (
    <>
      <Title titleText={title} />
      {loading ? (
        <LoaderSpinner />
      ) : (
        !error && (
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
        )
      )}
    </>
  );
};

export default HomeScreen;
