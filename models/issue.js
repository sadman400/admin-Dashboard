const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  description: String,
  category: String,
  image: String,
  location: String,
  status: String,
  // department: String,
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
