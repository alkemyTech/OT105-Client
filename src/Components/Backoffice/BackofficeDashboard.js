import React from 'react';
import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const BackOfficeDashBoard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: '#9AC9FB' }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon  />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BackOfficeDashBoard;
