const mongoose = require('mongoose');

// Define the schema for the blog data
const blogSchema = new mongoose.Schema({
  blogName: { type: String, required: true },
  blogDescription: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model based on the schema
const blogmodel = mongoose.model('blogdata', blogSchema);

module.exports = blogmodel;
