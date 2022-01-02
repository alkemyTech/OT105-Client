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
import CampaignIcon from '@mui/icons-material/Campaign';
import CategoryIcon from '@mui/icons-material/Category';
import BadgeIcon from '@mui/icons-material/Badge';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import BusinessIcon from '@mui/icons-material/Business';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';

const routes = [
  {
    name: 'Home',
    path: '/backoffice/home',
    icon: () => <HomeIcon />,
  },
  {
    name: 'Actividades',
    path: '/backoffice/activities',
    icon: () => <CampaignIcon />,
  },
  {
    name: 'Categorías',
    path: '/backoffice/categories',
    icon: () => <CategoryIcon />,
  },
  {
    name: 'Miembros',
    path: '/backoffice/members',
    icon: () => <BadgeIcon />,
  },
  {
    name: 'Novedades',
    path: '/backoffice/news',
    icon: () => <NewspaperIcon />,
  },
  {
    name: 'Organización',
    path: '/backoffice/organization',
    icon: () => <BusinessIcon />,
  },
  {
    name: 'Slides',
    path: '/backoffice/slides',
    icon: () => <BurstModeIcon />,
  },
  {
    name: 'Testimonios',
    path: '/backoffice/testimonies',
    icon: () => <ModeCommentIcon />,
  },
  {
    name: 'Usuarios',
    path: '/backoffice/users',
    icon: () => <GroupIcon />,
  },
  {
    name: 'Projects',
    path: '/backoffice/projects/create',
    icon: () => <BarChartIcon />,
  },
];

const Sidebar = ({ isOpen, handleDrawerToggle, drawerWidth }) => {
  const LinkList = () => {
    return (
      <List>
        {routes.map((route) => (
          <ListItem
            key={route.name}
            button
            component={Link}
            to={route.path}
            onClick={handleDrawerToggle}>
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
