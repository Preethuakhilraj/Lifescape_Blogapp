import  { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screens

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s';

  // Initialize default values
  let email = '';
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const parsedUser = JSON.parse(user); // Parse the JSON string
      email = parsedUser.email || ''; // Extract email or default to empty string
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  }

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#6200ea' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          LifeScape
        </Typography>

        {/* Hamburger Menu for Small Screens */}
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Dynamic Menu Items for Admin */}
        {email === 'admin@gmail.com' && !isSmallScreen && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={Link} to="/blogs">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/addblog">
              Add Blogs
            </Button>
          </Box>
        )}

        {/* User Info and Logout */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '20px',
            backgroundColor: '#ffffff20',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            gap: '1rem',
            cursor: 'pointer',
            flexDirection: isSmallScreen ? 'column' : 'row', // Stack on small screens
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff40';
            e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff20';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <Avatar
            src={avatarUrl}
            alt={email}
            sx={{
              width: isSmallScreen ? 32 : 36,
              height: isSmallScreen ? 32 : 36,
              border: '2px solid #fff',
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontWeight: 'bold',
              fontSize: isSmallScreen ? '0.875rem' : '1rem',
              color: '#fff',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
            }}
          >
            {email}
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: '500',
              color: '#f5f5f5',
              textTransform: 'none',
              padding: '4px 12px',
              borderRadius: '12px',
              backgroundColor: '#ff5722',
              '&:hover': {
                backgroundColor: '#e64a19',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>

      {/* Drawer for Small Screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: '#6200ea',
            color: '#fff',
          },
        }}
      >
        <List>
          {email === 'admin@gmail.com' && (
            <>
              <ListItem button component={Link} to="/blogs">
                <ListItemText primary="Blogs" />
              </ListItem>
              <ListItem button component={Link} to="/addblog">
                <ListItemText primary="Add Blogs" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
