const mongoose = require('mongoose');

// Define the schema for the student data
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model based on the schema
const BlogData = mongoose.model('blogdata', blogSchema);

module.exports = BlogData;
