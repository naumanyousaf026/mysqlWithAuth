// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Sequelize model

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await User.create({ name, email, password: hash, phone, role });

    // remove password before sending response
    const userSafe = { ...newUser.toJSON() };
    delete userSafe.password;

    res.json({ message: '✅ User registered successfully', user: userSafe });
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

    // create JWT payload (keep it small)
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role || 'user'
    };

    // sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', {
      expiresIn: '8h' // adjust as needed
    });

    // return token + sanitized user
    const userSafe = { ...user.toJSON() };
    delete userSafe.password;

    res.json({
      message: '✅ Login successful',
      token,
      user: userSafe
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

// Get all users (protected example) - optional
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '❌ Server error' });
  }
});

module.exports = router;
