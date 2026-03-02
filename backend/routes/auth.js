// routes/auth.js — updated version
// IMPORTANT: Move JWT_SECRET to your .env file!
// Add to .env: JWT_SECRET=your_super_secret_key_here

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'change_this_in_env';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: 'All fields are required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ msg: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ msg: 'Account created successfully', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'No account found with this email' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ msg: 'Incorrect password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;