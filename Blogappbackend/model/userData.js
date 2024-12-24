const mongoose = require('mongoose');

// Define the schema for the student data
const userSchema = new mongoose.Schema({
  email: {
    type: String
  },
 password: {
    type: String
     },
  phone: {
    type: Number
      } 
}, {
  collection: 'userdata' // Specify the collection name in MongoDB
});

// Create the model based on the schema
const userData = mongoose.model('userdata', userSchema);
module.exports=userData