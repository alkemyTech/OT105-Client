import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import image404 from '../../assets/img/404Error-somosMas.svg';

const Error404 = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };

  const theme = createTheme();

  theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '5rem',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container xs={12} alignItems="center" sx={{ height: '100vh' }}>
        <Grid
          container
          item
          spacing={3}
          xs={12}
          md={8}
          sx={{ margin: '0 auto' }}>
          <Grid item sm={12} md={7} justifyContent="center">
            <img src={image404} alt="404" />
          </Grid>
          <Grid item sm={12} md={5}>
            <Typography variant="h3" component="p">
              Oops.. Pagina no encontrada
            </Typography>

            <Button onClick={handleClick}>Ir al inicio</Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Error404;
