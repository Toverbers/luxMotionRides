const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
//const User = require('../models/User');
//const adminAuth = require('../middleware/adminAuth');
const { authenticate, authorize } = require("../middleware/auth");
const Visitor = require('../models/Visitor');

// Already inside adminAuth middleware
router.get('/', authenticate, authorize(["superadmin", "manager", "viewer"]), async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalServices = await Service.countDocuments();
    //const totalUsers = await User.countDocuments();
    const totalVisitors = await Visitor.countDocuments();

    res.json({
      totalBookings,
      totalServices,
      //totalUsers,
      totalVisitors
    });
  } catch (error) {
    console.error('Error fetching site stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
