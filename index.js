const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sadmanhossain400:RYAgCGAZRRYyYhaU@cluster0.jzhocak.mongodb.net/smartcitycitizen?retryWrites=true&w=majority')
  .then(() => console.log("connection successfully"))
  .catch((err) => console.log(err))

const issueSchema = new mongoose.Schema({
  description: String,
  category: String,
  image: String,
  location: String,
  status: String,
  department: String,
});

const Issue = mongoose.model('Issue', issueSchema);

app.post('/api/issues', async (req, res) => {
  try {
    const { error } = validateIssue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { description, category, image, location } = req.body;

    const newIssue = new Issue({
      description,
      category,
      image,
      location,
      status: 'pending',
      department: null,
    });

    await newIssue.save();
    res.send(newIssue);
  } catch (error) {
    res.status(500).send('Failed to create an issue');
  }
});

app.put('/api/issues/:id/status', async (req, res) => {
  try {
    const { error } = Joi.object({ status: Joi.string().valid('pending', 'acknowledged', 'in-progress', 'resolved') }).validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const issue = await Issue.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });

    if (!issue) return res.status(404).send('Issue not found');
    res.send(issue);
  } catch (error) {
    res.status(500).send('Failed to update issue status');
  }
});

app.post('/api/communication', async (req, res) => {
  try {
    const { issueId, sender, receiver, message } = req.body;

    
    // Reshad dadar lila 

    res.json({ issueId, sender, receiver, message, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).send('Failed to log communication');
  }
});

function validateIssue(issue) {
  const schema = Joi.object({
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
  });

  return schema.validate(issue);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
