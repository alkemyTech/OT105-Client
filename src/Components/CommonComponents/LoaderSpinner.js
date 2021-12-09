import React from 'react';
import { Box } from '@mui/material';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

// if recives props.full shows a fullscreen loader component
const LoaderSpinner = ({ full = false }) => {
  if (full) {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.99)',
          zIndex: '3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Loader color="#9AC9FB" height={100} type="ThreeDots" width={100} />
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Loader color="#9AC9FB" height={100} type="ThreeDots" width={100} />
      </Box>
    );
  }
};

export default LoaderSpinner;
