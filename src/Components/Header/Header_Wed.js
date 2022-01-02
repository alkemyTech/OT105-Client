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
    path: '/aboutus',
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

const Header_Wed = ({ isLogged }) => {
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
          <Toolbar disableGutters sx={{ paddingInline: '2rem', gap: '2rem' }}>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}>
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
                    key={link.name}
                    component={Link}
                    to={link.path}
                    onClick={handleCloseNavMenu}>
                    {link.name}
                  </MenuItem>
                ))}
                {!isLogged ? (
                  <MenuItem
                    component={Link}
                    to="/login"
                    onClick={handleCloseNavMenu}>
                    Login
                  </MenuItem>
                ) : (
                  <MenuItem
                    component={Link}
                    to="/logout"
                    onClick={handleCloseNavMenu}>
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </Box>

            <img
              alt="logo"
              src={organizationInformation.logo}
              style={{ maxWidth: '100%', height: '150px' }}
            />

            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  md: 'flex',
                  justifyContent: 'right',
                  gap: '1rem',
                },
                alignItems: 'center',
                gap: '0',
              }}>
              {links.map((link) => (
                <Button
                  key={link.name}
                  component={Link}
                  sx={{
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingInline: '1rem',
                  }}
                  to={link.path}
                  onClick={handleCloseNavMenu}>
                  {link.name}
                </Button>
              ))}
              {!isLogged ? (
                <Button
                  color="primary"
                  component={Link}
                  sx={{
                    textTransform: 'none',
                    height: '100%',
                    bgcolor: 'white',
                    ':hover': {
                      bgcolor: '#EDF2F7',
                      color: 'primary.info',
                    },
                    marginLeft: '2rem',
                  }}
                  to="/login"
                  variant="outlined">
                  Login
                </Button>
              ) : (
                <Button
                  color="primary"
                  component={Link}
                  sx={{
                    textTransform: 'none',
                    height: '100%',
                    bgcolor: 'white',
                    ':hover': {
                      bgcolor: '#EDF2F7',
                      color: 'primary.info',
                    },
                    marginLeft: '2rem',
                  }}
                  to="/logout"
                  variant="outlined">
                  Logout
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header_Wed;
