import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { getOrganization } from '../../Services/organizationService';

const links = [
  {
    name: 'Inicio',
    path: '/',
  },
  {
    name: 'Nosotros',
    path: '/AboutUs',
  },
  {
    name: 'Contacto',
    path: '/contact',
  },
  {
    name: 'Campaña Escolar',
    path: '/school-campaign',
  },
  {
    name: 'Campaña de Juguetes',
    path: '/toys-campaign',
  },
];

const Header_Wed = () => {
  const linkStyle = { textDecoration: 'none', color: 'white' };
  const linkMenu = { textDecoration: 'none', color: 'black' };
  const [organizationInformation, setOrganizationInformation] = useState({});

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    getOrganization().then((res) => {
      setOrganizationInformation(res.data);
    });
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#28527A',
          color: 'white',
        }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                aria-controls="menu-appbar"
                aria-haspopup="true"
                aria-label="account of current user"
                color="inherit"
                size="large"
                onClick={handleOpenNavMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                keepMounted
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                id="menu-appbar"
                open={Boolean(anchorElNav)}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handleCloseNavMenu}>
                {links.map((link) => (
                  <MenuItem
                    key={link}
                    to={link.path}
                    onClick={handleCloseNavMenu}>
                    <Link style={linkMenu} to={link.path}>
                      {link.name}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <div
              style={{
                width: '240px',
                height: '170px',
                margin: '10px auto',
                display: 'flex',
              }}>
              <img
                alt="logo"
                height="100%"
                src={organizationInformation.logo}
                width="100%"
              />
            </div>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex', justifyContent: 'right' },
              }}>
              {links.map((link) => (
                <Button
                  key={link}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  to={link.path}
                  onClick={handleCloseNavMenu}>
                  <Link style={linkStyle} to={link.path}>
                    {link.name}
                  </Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header_Wed;
