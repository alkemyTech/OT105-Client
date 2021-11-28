import { styled } from '@mui/material/styles';
import React from 'react';

export const Card = ({ children }) => {
  return <Root>{children}</Root>;
};

const Root = styled('div')(({ theme }) => ({
  width: '90%',
  maxWidth: '800px',
  margin: '30px auto',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));
