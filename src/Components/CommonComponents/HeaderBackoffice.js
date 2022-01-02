import { useState } from 'react';
import Sidebar from './SidebarBackoffice';
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const HeaderBackoffice = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', padding: '0' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#9AC9FB',
          zIndex: { xl: '1201' },
        }}>
        <Toolbar sx={{ justifyContent: 'left' }}>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            size="large"
            sx={{ mr: 2, display: { xl: 'none' } }}
            onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">Backoffice</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        isOpen={drawerOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xl: `calc(100% - ${drawerWidth}px)` },
          padding: '0',
        }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default HeaderBackoffice;
