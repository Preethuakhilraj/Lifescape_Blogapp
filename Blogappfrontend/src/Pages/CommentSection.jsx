import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import { TextField, Button, Grid, Box, Typography, Divider, Avatar } from '@mui/material';

const CommentsSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch previous comments for this blog from localStorage
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`comments-${blogId}`)) || [];
    setComments(storedComments);
  }, [blogId]);

  // Handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      localStorage.setItem(`comments-${blogId}`, JSON.stringify(updatedComments)); // Save to localStorage for this blogId
      setNewComment('');
    }
  };

  return (
    <Box sx={{ marginTop: '2rem',marginLeft:'1rem',marginRight:'2rem' }}>
      <Typography variant="h6" gutterBottom>
        Comments ({comments.length})
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder="Add a comment..."
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAddComment} sx={{ float: 'right' }}>
            Post Comment
          </Button>
        </Grid>
      </Grid>

      {/* Display Comments */}
      <Box sx={{ marginTop: '2rem' }}>
        {comments.map((comment, index) => (
          <Box key={index} sx={{ marginBottom: '1rem' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <Avatar sx={{ marginRight: '1rem', bgcolor: 'primary.main' }}>
                {comment.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body1">{comment}</Typography>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// PropTypes validation for blogId
CommentsSection.propTypes = {
  blogId: PropTypes.string.isRequired, // Ensure that blogId is a required string
};

export default CommentsSection;
