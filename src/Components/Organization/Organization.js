import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { ImageListItem, Typography } from '@mui/material';
import { Card } from './Card';

export default function Organization() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="h4">Somos más</Typography>
        <Divider />
        <Typography variant="subtitle1">Image</Typography>
        <ImageListItem>
          <img
            alt="imagen-de-ong"
            fit="cover"
            load="lazy"
            src="https://picsum.photos/800/350"
          />
        </ImageListItem>
        <Divider />
        <Typography variant="subtitle1">Description</Typography>
        <Typography variant="body1">
          lorem ipsum dolor sit amet, consectetur adip iscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
