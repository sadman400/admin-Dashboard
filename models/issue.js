const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  message: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const issueSchema = new mongoose.Schema({
  description: String,
  category: String,
  image: String,
  name: String,
  email: String,
  userId: String,
  status: String,
  admin_replies: [replySchema] // Array of reply objects
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
