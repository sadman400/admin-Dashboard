const express = require('express');
const Issue = require('../models/issue');
const validateIssue = require('../validators/issueValidator');

const router = express.Router();

router.post('/api/issues', async (req, res) => {
  try {
    const { error } = validateIssue(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { description, category, image, location,userId } = req.body;

    const newIssue = new Issue({
      description,
      category,
      image,
      location,
      userId,
      status: 'pending',
    });

    await newIssue.save();
    res.send(newIssue);
  } catch (error) {
    res.status(500).send('Failed to create an issue');
  }
});

router.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.send(issues);
  } catch (error) {
    res.status(500).send('Failed to retrieve issues');
  }
});

router.put('/api/issues/:id/status', async (req, res) => {
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

router.post('/api/communication', async (req, res) => {
  try {
    const { issueId, sender, receiver, message } = req.body;

    // Reshad dadar lila 

    res.json({ issueId, sender, receiver, message, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).send('Failed to log communication');
  }
});

module.exports = router;
