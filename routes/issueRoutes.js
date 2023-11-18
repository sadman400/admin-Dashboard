const express = require('express');
const Issue = require('../models/issue');
const validateIssue = require('../validators/issueValidator');

const router = express.Router();


// POST AN ISSUE 
router.post('/api/issues', async (req, res) => {
  try {
    const { error } = validateIssue(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const { description, category, image,name,email,userId} = req.body;

    const newIssue = new Issue({
      description,
      category,
      name,
      email,
      image,
      userId,
      status: 'pending',
    });

    await newIssue.save();
    res.send(newIssue);
  } catch (error) {
    res.status(500).send('Failed to create an issue');
  }
});




// GET AN ISSUE
router.get('/api/issues', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.send(issues);
  } catch (error) {
    res.status(500).send('Failed to retrieve issues');
  }
});




// GET SINGLE ISSUE
router.get('/api/issues/:id', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).send('Issue not found');
    }

    res.send(issue);
  } catch (error) {
    res.status(500).send('Failed to get the issues');
  }
})




// REPLY BY ID 
router.post('/api/issues/:id/reply', async (req, res) => {
  try {
    const { reply, status } = req.body;

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).send('Issue not found');
    }

    if (reply) {
      issue.replies.push({ message: reply, timestamp: new Date().toISOString() });
      issue.status = 'active';
    } else {
      issue.status = 'pending';
    }
    

    await issue.save();

    res.send(issue);
  } catch (error) {
    res.status(500).send('Failed to reply to the issue');
  }
});




// UPDATE ISSUE 
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



// COMMUNICATION WITH USER 
router.post('/api/communication', async (req, res) => {
  try {
    const { issueId, sender, receiver, message } = req.body;

    // Reshad dadar lila 

    res.json({ issueId, sender, receiver, message, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).send('Failed to log communication');
  }
});




// DELETE AN ISSUE 
router.delete('/api/issues/:id', async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) return res.status(404).send('Issue not found');
    res.send(issue);
  } catch (error) {
    res.status(500).send('Failed to delete issue');
  }
});

module.exports = router;
