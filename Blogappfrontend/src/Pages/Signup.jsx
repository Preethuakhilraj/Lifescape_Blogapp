import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

export default function Signup() {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const { username, email, password } = userCredentials;
    if (!username || !email || !password) {
      return alert('All fields are required.');
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return alert('Invalid email format.');
    }
    if (password.length < 6) {
      return alert('Password must be at least 6 characters long.');
    }

    setLoading(true); // Start loading

    try {
      const response = await axiosInstance.post('/user/signup', userCredentials);
      console.log('Signup response:', response.data);
      alert('Signup Successful! Please login.');
      navigate('/');
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'An error occurred during signup.');
      } else {
        alert('An error occurred during signup.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#121212', // Black background
        color: '#FFFFFF', // White font color
      }}
    >
      <Box
        sx={{
          width: { xs: '90%', sm: '400px' },
          backgroundColor: '#333333', // Dark grey form background
          padding: '40px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center' }}>
          Sign Up
        </Typography>
        <hr style={{ borderColor: '#FF8C00' }} /> {/* Orange accent */}
        <form onSubmit={handleSubmit}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            value={userCredentials.username}
            onChange={handleChange}
            variant="filled"
            fullWidth
            margin="normal"
            InputProps={{ style: { color: 'white' } }} // White input text
            InputLabelProps={{ style: { color: 'grey' } }} // Grey label text
          />
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            value={userCredentials.email}
            onChange={handleChange}
            variant="filled"
            fullWidth
            margin="normal"
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'grey' } }}
          />
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            value={userCredentials.password}
            onChange={handleChange}
            variant="filled"
            fullWidth
            margin="normal"
            InputProps={{ style: { color: 'white' } }}
            InputLabelProps={{ style: { color: 'grey' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              backgroundColor: '#1E90FF', // Blue button color
              '&:hover': {
                backgroundColor: '#FF8C00', // Orange hover effect
              },
            }}
            disabled={loading} // Disable while loading
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#FFF' }} /> : 'Sign Up'}
          </Button>
          <Typography
            sx={{ mt: 2, textAlign: 'center', color: '#FFFFFF' }}
            component={Link}
            to="/"
            variant="body2"
          >
            Already have an account? Log in
          </Typography>
        </form>
      </Box>
    </Box>
  );
}
