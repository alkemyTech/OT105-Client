import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox'; //BUscar iconss

const routes = [
  {
    name: 'Actividades',
    path: '/backoffice/activities',
    icon: () => <InboxIcon />,
  },
  {
    name: 'Categorías',
    path: '/backoffice/categories',
    icon: () => <InboxIcon />,
  },
  {
    name: 'Miembros',
    path: '/backoffice/members',
    icon: () => <InboxIcon />,
  },
  {
    name: 'Novedades',
    path: '/backoffice/news',
    icon: () => <InboxIcon />,
  },
  {
    name: 'Organización',
    path: '/backoffice/organization',
    icon: () => <InboxIcon />,
  },
  {
    name: 'Slides',
    path: '/backoffice/slides',
    icon: () => <InboxIcon />,
  },
  {
    name: 'Testimonios',
    path: '/backoffice/testimonies',
    icon: () => <InboxIcon />,
  },
  {
    name: 'Usuarios',
    path: '/backoffice/users',
    icon: () => <InboxIcon />,
  },
];

const Sidebar = ({ isOpen, handleDrawerToggle, drawerWidth }) => {
  const LinkList = () => {
    return (
      <List>
        {routes.map((route) => (
          <ListItem key={route.name} button component={Link} to={route.path}>
            <ListItemIcon>{route.icon()}</ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    );
  };

  const permanentDrawer = (
    <Drawer
      open
      sx={{
        display: { xs: 'none', xl: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
      variant="permanent">
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <LinkList />
      </Box>
    </Drawer>
  );

  const temporaryDrawer = (
    <Drawer
      ModalProps={{
        keepMounted: true,
      }}
      open={isOpen}
      sx={{
        display: { xs: 'block', xl: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
      variant="temporary"
      onClose={handleDrawerToggle}>
      <Box sx={{ overflow: 'auto' }}>
        <Toolbar />
        <Divider />
        <LinkList />
      </Box>
    </Drawer>
  );

  return (
    <Box
      aria-label="backoffice routes"
      component="nav"
      sx={{ width: { xl: drawerWidth }, flexShrink: { xl: 0 } }}>
      {permanentDrawer}
      {temporaryDrawer}
    </Box>
  );
};

export default Sidebar;
