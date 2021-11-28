import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { ImageListItem, Typography } from '@mui/material';
import { Card } from './Card';

export default function Organization({
  name = 'Somos más',
  image = 'https://picsum.photos/800/350',
  description = '',
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="h4">{name}</Typography>
        <Divider />
        <Typography variant="subtitle1">Image</Typography>
        <ImageListItem>
          <img alt="imagen-de-ong" fit="cover" load="lazy" src={image} />
        </ImageListItem>
        <Divider />
        <Typography variant="subtitle1">Description</Typography>
        <Typography variant="body1">
          {description || 'No se cargó una descripción.'}
        </Typography>
        <Divider />
        <br />
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to="/backoffice/organization/edit">
          <Button size="large" variant="contained">
            Edit
          </Button>
        </Link>
      </Card>
    </Box>
  );
}
