import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderBackoffice = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#9AC9FB' }}>
        <Toolbar sx={{ justifyContent: 'left' }}>
          <IconButton
            aria-label="menu"
            color="inherit"
            edge="start"
            size="large"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">Backoffice</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBackoffice;
