import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/user/login', user)
      .then((res) => {
        alert(res.data.message);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/blogs');
      })
      .catch((error) => {
        console.error('There was an error logging in:', error);
        alert('Login failed, please check your credentials and try again.');
      });
    console.log('User:', user);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      padding={3}
      width="100vw"
      sx={{
        backgroundImage: 'url(https://images.pexels.com/photos/5423287/pexels-photo-5423287.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        bgcolor="rgba(128,128,128,0.8)" // Added semi-transparent background for better readability
        padding={3}
        borderRadius={2}
        boxShadow={3}
        maxWidth={400}
        width="100%"
      >
        <Typography variant="h4" component="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box marginBottom={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </Box>
          <Box marginBottom={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
          <Grid item xs={12} md={12} sm={12} style={{ marginTop: '1rem' }}>
            <Typography>
              <Link to="/signup" className="custom-link">
                Not a registered user? Register Now
              </Link>
            </Typography>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
