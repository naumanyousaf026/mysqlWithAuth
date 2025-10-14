const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Sequelize model

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({ name, email, password: hash });

    res.json({ message: '✅ User registered successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ message: '✅ Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

//  Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

module.exports = router;
