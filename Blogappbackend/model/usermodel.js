const mongoose = require('mongoose');

// Define the schema for the user data
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate emails
      trim: true,   // Removes whitespace from the input
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,   // Removes leading/trailing spaces
    },
  },
  {
    collection: 'userdata', // Specify the collection name in MongoDB
    timestamps: true,       // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model based on the schema
const UserModel = mongoose.model('userdata', userSchema);

module.exports = UserModel;
