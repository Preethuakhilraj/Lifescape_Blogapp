
import { Box, Typography, Grid, TextField, Button, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        padding: '2rem 1rem',
        marginTop: '2rem',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* About Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2">
            Welcome to our blog app, where we share insightful articles on various topics. Stay informed and inspired with our latest posts.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography
              component="a"
              href="/"
              sx={{ textDecoration: 'none', color: 'inherit', ':hover': { textDecoration: 'underline' } }}
            >
              Home
            </Typography>
            <Typography
              component="a"
              href="/about"
              sx={{ textDecoration: 'none', color: 'inherit', ':hover': { textDecoration: 'underline' } }}
            >
              About
            </Typography>
            <Typography
              component="a"
              href="/blogs"
              sx={{ textDecoration: 'none', color: 'inherit', ':hover': { textDecoration: 'underline' } }}
            >
              Blogs
            </Typography>
            <Typography
              component="a"
              href="/contact"
              sx={{ textDecoration: 'none', color: 'inherit', ':hover': { textDecoration: 'underline' } }}
            >
              Contact
            </Typography>
          </Box>
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
            Subscribe to our newsletter to receive the latest updates and articles directly to your inbox.
          </Typography>
          <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <TextField
              variant="filled"
              placeholder="Enter your email"
              size="small"
              sx={{ backgroundColor: '#ecf0f1', borderRadius: '4px' }}
              fullWidth
            />
            <Button variant="contained" sx={{ backgroundColor: '#e74c3c', ':hover': { backgroundColor: '#c0392b' } }}>
              Subscribe
            </Button>
          </Box>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
            Stay connected with us on social media for the latest updates.
          </Typography>
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <IconButton
              component="a"
              href="https://facebook.com"
              sx={{ color: 'inherit', ':hover': { color: '#3498db' } }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              sx={{ color: 'inherit', ':hover': { color: '#1da1f2' } }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              sx={{ color: 'inherit', ':hover': { color: '#0077b5' } }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              sx={{ color: 'inherit', ':hover': { color: '#e4405f' } }}
            >
              <Instagram />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: '#7f8c8d', margin: '1.5rem 0' }} />

      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Blog App. All rights reserved.
      </Typography>
    </Box>
  );
}
