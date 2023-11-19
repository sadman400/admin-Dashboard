// routes/userRoutes.js
const express = require('express');
const User = require('../models/user');
const validateUser = require('../validators/userValidator')

const router = express.Router();


// POST A USER 
router.post('/api/users', async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, email } = req.body;

    const newUser = new User({
      name,
      email,
    });

    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send('Failed to create a user');
  }
});



// REPLY AS USER
router.post('/api/users/:id/reply', async (req, res) => {
  try {
    const { reply, question } = req.body; // Updated variable names

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.user_replies.push({
      ans: reply, // Change from 'message' to 'ans'
      question: question, // Add question field
      timestamp: new Date().toISOString()
    });

    await user.save();
    res.send(user);
  } catch (error) {
    return res.status(500).send('Failed to reply to the user');
  }
});




// GET A USER 
router.get('/api/users', async (req, res) => {
  try {

    const { email, name } = req.query;
    const query = {};
    if (email) {
      query.email = email;
    }
    if (name) {
      query.name = name;
    }
    
    const users = await User.find(query);
    res.send(users);
  } catch (error) {
    res.status(500).send('Failed to retrieve users');
  }
});

module.exports = router;
