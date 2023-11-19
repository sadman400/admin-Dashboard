// models/user.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  ans: String,
  question: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_replies: [replySchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
