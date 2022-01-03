import React from 'react';
import { Box } from '@mui/material';

const CustomSkeleton = ({
  type = 'text',
  width = '100%',
  height = '1rem',
  color = '#c1c1c1',
}) => {
  let skeleton;

  if (type === 'text') {
    skeleton = (
      <Box
        sx={{
          marginBottom: '10px',
          backgroundColor: color,
          width,
          height,
        }}></Box>
    );
  } else if (type === 'avatar') {
    skeleton = (
      <Box
        sx={{
          marginBottom: '10px',
          backgroundColor: color,
          width,
          height,
          borderRadius: '50%',
        }}></Box>
    );
  } else if (type === 'rectangle') {
    skeleton = (
      <Box
        sx={{
          marginBottom: '10px',
          backgroundColor: color,
          width,
          height,
        }}></Box>
    );
  }

  return skeleton;
};

export default CustomSkeleton;
