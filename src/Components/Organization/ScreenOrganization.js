import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { ImageListItem, Typography } from '@mui/material';
import { getOrganization } from '../../Services/organizationService';

const OrganizationInfo = ({ id }) => {
  const [organizationData, setOrganizationData] = useState({});

  useEffect(() => {
    getOrganization(1).then((res) => setOrganizationData(res.data));
  }, []);

  const { name, logo, short_description, long_description, welcome_text } =
    organizationData;

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '99.9%',
        display: 'flex',
        placeContent: 'center',
        alignItems: 'center',
      }}>
      <Card as="span" sx={{ flexGrow: 1, maxWidth: '800px' }}>
        <Typography variant="subtitle1">Nombre de la ONG</Typography>
        <Typography variant="h4">
          {name || 'No se encuentra el nombre'}
        </Typography>
        <Divider />
        <Typography variant="subtitle1">Texto de bienvenida</Typography>
        <Typography variant="h4">
          {welcome_text || 'No se encuentra el texto de bienvenida'}
        </Typography>
        <Divider />

        <Typography variant="subtitle1">Logo</Typography>
        <ImageListItem
          sx={{
            maxHeight: '350px',
            width: '100%',
            objectFit: 'cover',
            overflow: 'hidden',
          }}>
          {logo ? (
            <img alt="logo-de-ong" fit="" loading="lazy" src={logo} />
          ) : (
            <Typography variant="h6">
              <h4>No se encuentra el logo</h4>
            </Typography>
          )}
        </ImageListItem>
        <Divider />
        <Typography variant="subtitle1">Descripción corta</Typography>
        <Typography variant="body1">
          {short_description || 'No se cargó una descripción corta.'}
        </Typography>
        <Divider />
        <Typography variant="subtitle1">Descripción larga</Typography>
        <Typography variant="body1">
          {long_description || 'No se cargó una descripción larga.'}
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
