const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  ans: String,
  question: String, // Add description field
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
  status: {
    type: String,
    enum: ['active', 'pending'],
    default: 'pending',
  },
  admin_replies: [replySchema] // Array of reply objects
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
