const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// POST /api/visitor/track
router.post('/track', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    await Visitor.create({ ip, userAgent });

    res.json({ message: 'Visitor logged' });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
