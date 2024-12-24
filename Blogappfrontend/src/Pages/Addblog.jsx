import { useState } from 'react';
import { Button, Grid, TextField, Typography, Snackbar, Alert, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axiosInstance from '../axiosInterceptor';

export default function AddBlog() {
  const [blogName, setBlogName] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

  const handleAddBlog = async () => {
    if (!blogName || !blogDescription || !category || !author || !imageUrl) {
      setError('All fields are required.');
      return;
    }

    const newBlog = {
      blogName,
      blogDescription,
      category,
      author,
      imageUrl,
    };

    try {
      const response = await axiosInstance.post('/api/add', newBlog, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Blog added successfully:', response.data);

      setBlogName('');
      setBlogDescription('');
      setCategory('');
      setAuthor('');
      setImageUrl('');
      setSuccess(true);
      setError(null);
    } catch (error) {
      console.error('There was an error adding the blog:', error.response || error.message);
      setError('Failed to add the blog. Please try again.');
    }
  };

  return (
    <div style={{ margin: isSmallScreen ? '2%' : '5%' }}>
      <Grid container spacing={4} alignItems="center">
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <img
            src="https://images.pexels.com/photos/6547044/pexels-photo-6547044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Blog Visual"
            style={{
              borderRadius: '8px',
              width: '100%',
              height: isSmallScreen ? '200px' : '100%',
              objectFit: 'cover',
            }}
          />
        </Grid>

        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant={isSmallScreen ? 'h5' : 'h4'}
            gutterBottom
            sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}
          >
            Create a New Blog
          </Typography>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Name"
                variant="outlined"
                value={blogName}
                onChange={(e) => setBlogName(e.target.value)}
                error={!blogName && error}
                helperText={!blogName && error ? 'Blog Name is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Description"
                variant="outlined"
                multiline
                rows={isSmallScreen ? 4 : 6}
                value={blogDescription}
                onChange={(e) => setBlogDescription(e.target.value)}
                error={!blogDescription && error}
                helperText={!blogDescription && error ? 'Blog Description is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                error={!category && error}
                helperText={!category && error ? 'Category is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                variant="outlined"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                error={!author && error}
                helperText={!author && error ? 'Author is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                error={!imageUrl && error}
                helperText={!imageUrl && error ? 'Image URL is required' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleAddBlog}
                sx={{
                  padding: isSmallScreen ? '10px' : '12px',
                  fontWeight: 'bold',
                  fontSize: isSmallScreen ? '0.9rem' : '1rem',
                }}
              >
                Add Blog
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Snackbar for Feedback */}
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Blog added successfully!
        </Alert>
      </Snackbar>

      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
