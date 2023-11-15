// routes/userRoutes.js
const express = require('express');
const User = require('../models/user');
const validateUser = require('../validators/userValidator')

const router = express.Router();

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

router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send('Failed to retrieve users');
  }
});

module.exports = router;
