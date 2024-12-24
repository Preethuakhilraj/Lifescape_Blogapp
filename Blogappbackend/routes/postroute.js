const express = require('express');
const jwt = require('jsonwebtoken');
const Blog = require('../model/blogmodel'); // Assuming you have a Blog model

const router = express.Router();

// Middleware to verify the token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized access. Token missing or malformed.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'blog'); // Ensure 'blog' is your secret key
    req.user = decoded; // Store decoded payload in request
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

// Route to add a new blog
router.post('/add', verifyToken, async (req, res) => {
  try {
    console.log('Incoming request body:', req.body); // Log the request body
    const { blogName, blogDescription, category, author, imageUrl } = req.body;

    if (!blogName || !blogDescription || !category || !author || !imageUrl) {
      return res.status(400).json({
        message: 'Blog Name, Description, Category, Author, and Image URL are required.',
      });
    }

    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (err) {
    console.error('Error saving blog:', err.message);
    res.status(500).json({ message: 'Failed to save the blog. Please try again later.' });
  }
});


// Route to get all blogs
router.get('/blogs', verifyToken, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs); // Ensure JSON response is returned
  } catch (err) {
    console.error('Error retrieving blogs:', err.message);
    res.status(500).json({ message: 'Failed to retrieve blogs. Please try again later.' });
  }
});

router.get('/blogs/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId); 
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
