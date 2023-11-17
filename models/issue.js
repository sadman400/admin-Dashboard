const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  description: String,
  category: String,
  image: String,
  name:String,
  email:String,
  userId:String,
  status:String
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
