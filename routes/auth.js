const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const { authenticate, authorize } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET;

// Register Admin (for initial setup)
router.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  try {
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AdminUser({ firstname, lastname, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Admin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminUser.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token, role: admin.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  const user = await AdminUser.findById(req.admin._id).select('-password');
  res.json({ message: 'Profile fetched', data: user });
});

// Update user profile
router.put("/profile", authenticate, async (req, res) => {
  const { firstname, lastname, email } = req.body;
  const updated = await AdminUser.findByIdAndUpdate(req.admin._id, { firstname, lastname, email }, { new: true });
  res.json(updated);
});

// Change password
router.put("/change-password", authenticate, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await AdminUser.findById(req.admin._id);
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated" });

  /* const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Old password is incorrect' });
  }

  user.password = newPassword; // will be hashed via pre-save hook
  await user.save();

  res.json({ message: 'Password updated successfully' }); */
});

module.exports = router;
