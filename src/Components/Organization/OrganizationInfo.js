import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { ImageListItem, Typography } from '@mui/material';

const OrganizationInfo = ({ id }) => {
  const [organizationData, setOrganizationData] = useState({
    name: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    getOrganizationData(id);
  }, []);

  const { name, image, description } = organizationData;

  const getOrganizationData = (id) => {
    const data = {
      name: 'Somos más',
      image: 'https://picsum.photos/800/350',
      description:
        'Culpa velit sint labore pariatur nulla qui excepteur laboris reprehenderit in irure aute reprehenderit duis. Exercitation fugiat dolor eiusmod consequat id Lorem proident minim nisi est. Anim laborum elit est mollit ullamco in est consequat. Aliquip consequat laborum ullamco nisi ipsum ex reprehenderit laboris dolore nisi ad consequat mollit. Ea aliqua consequat velit veniam consectetur exercitation velit. Ut irure amet ad voluptate ad anim adipisicing est. ',
    };

    setOrganizationData(data);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '99.9%',
        display: 'flex',
        placeContent: 'center',
        alignItems: 'center',
        height: '100vh',
        border: '1px solid red',
      }}>
      <Card as="span" sx={{ flexGrow: 1, maxWidth: '800px' }}>
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="h4">
          {name || 'No se encuentra el nombre'}
        </Typography>
        <Divider />
        <Typography variant="subtitle1">Image</Typography>
        <ImageListItem
          sx={{
            maxHeight: '350px',
            width: '100%',
            objectFit: 'cover',
            overflow: 'hidden',
          }}>
          {image ? (
            <img alt="imagen-de-ong" fit="" loading="lazy" src={image} />
          ) : (
            <Typography variant="h6">
              <h4>No se encuentra la imagen</h4>
            </Typography>
          )}
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
};

export default OrganizationInfo;
