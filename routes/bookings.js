const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const nodemailer = require("nodemailer");
const moment = require('moment');

// Email config
const transporter = nodemailer.createTransport({
    /* service: 'gmail',
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }, */
      host: 'smtp.titan.email', // Titan's SMTP server
      port: 465, // SSL port
      secure: true, // true for 465, false for other ports
      auth: {
          user: process.env.EMAIL_USER, // Your Titan email address
          pass: process.env.EMAIL_PASS // Your Titan email password
      }
});

// Create booking
router.post("/", async (req, res) => {
  const { serviceId, userDetails, date, time, pickup, dropoff, airline, flightNo, checkedBag, carryOn, travelPet, noOfPeople, note } = req.body;
  const booking = new Booking({ serviceId, userDetails, date, time, pickup, dropoff, airline, flightNo, checkedBag, carryOn, travelPet, noOfPeople, note });
  await booking.save();

  // Get service details
  const service = await Service.findById(serviceId);

  // Email to admin
  const adminMail = {
    //from: process.env.EMAIL_USER,
    from: 'do-not-reply@luxmotionrides.com',
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking - ${service.title}`,
    html: `<h3>New Booking</h3>
           <p><strong>Name:</strong> ${userDetails.name}</p>
           <p><strong>Email:</strong> ${userDetails.email}</p>
           <p><strong>Phone:</strong> ${userDetails.phone}</p>
           <p><strong>Service:</strong> ${service.title}</p>
           <p><strong>Date:</strong> ${date}</p>
           <p><strong>Time:</strong> ${time}</p>
           <p><strong>Time:</strong> ${noOfPeople}</p>
           <p><strong>Time:</strong> ${note}</p>
           <p><strong>Pickup Location:</strong> ${pickup.address}</p>
           <p><strong>Drop Off Location:</strong> ${dropoff.address}</p>
           <p><strong>Airline Name:</strong> ${airline || 'None'}</p>
           <p><strong>Flight Number:</strong> ${flightNo || 'None'}</p>
           <p><strong>Checked Bag:</strong> ${checkedBag || 'None'}</p>
           <p><strong>Carry On:</strong> ${carryOn || 'None'}</p>
           <p><strong>Have Pet:</strong> ${travelPet || 'None'}</p>
           `
  };

  const adminHtml = generateAdminBookingEmailTemplate({
        title: 'New Booking',
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        date: moment(date).format('DD MMMM YYYY'), 
        time,
        noOfPeople, 
        note,
        serviceType: service.title,
        pickup: pickup.address,
        pickupLatitude: pickup.latitude,
        pickupLongitude: pickup.longitude,
        dropoff: dropoff.address,
        dropoffLatitude: dropoff.latitude,
        dropoffLongitude: dropoff.longitude,
        airline, 
        flightNo, 
        checkedBag, 
        carryOn, 
        travelPet,
        
      });

  // Email to user
  const userMail = {
    //from: process.env.EMAIL_USER,
    from: 'do-not-reply@luxmotionrides.com',
    to: userDetails.email,
    subject: `Booking Confirmation - ${service.title}`,
    html: `<h3>Your booking is confirmed!</h3>
           <p>Thank you for booking with us, we have received your booking. please stay active while we confirm your details. </p>
           <p><strong>Service:</strong> ${service.title}</p>
           <p><strong>Name:</strong> ${userDetails.name}</p>
           <p><strong>Email:</strong> ${userDetails.email}</p>
           <p><strong>Phone:</strong> ${userDetails.phone}</p>
           <p><strong>Service:</strong> ${service.title}</p>
           <p><strong>Chosen Date:</strong> ${moment(date).format('DD MMMM YYYY')}</p>
           <p><strong>Chosen Time:</strong> ${time}</p>
           <p><strong>Chosen Time:</strong> ${noOfPeople}</p>
           <p><strong>Chosen Time:</strong> ${note}</p>
           <p><strong>Pickup Location:</strong> ${pickup.address}</p>
           <p><strong>Drop Off Location:</strong> ${dropoff.address}</p>
           <p><strong>Airline Name:</strong> ${airline || 'None'}</p>
           <p><strong>Flight Number:</strong> ${flightNo || 'None'}</p>
           <p><strong>Checked Bag:</strong> ${checkedBag || 'None'}</p>
           <p><strong>Carry On:</strong> ${carryOn || 'None'}</p>
           <p><strong>Have Pet:</strong> ${travelPet || 'None'}</p>
           <p style="margin-top: 5px;">We’ll be in touch soon!</p>`
  };

  //await transporter.sendMail(adminMail);
  await transporter.sendMail(userMail);
  await transporter.sendMail({
    from: `"Lux Motion Rides" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Quote Request Form Submission',
    html: adminHtml
  });

  res.status(201).json({ message: "Booking created and emails sent." });
});

// Get all bookings (admin only)
const { authenticate, authorize } = require("../middleware/auth");
const { generateAdminBookingEmailTemplate } = require("../utils/bookingTemplate");
router.get("/", authenticate, authorize(["superadmin", "manager", "viewer"]), async (req, res) => {
  const bookings = await Booking.find().populate("serviceId");
  res.json(bookings);
});

// GET /api/v1/bookings/:id
router.get('/:id', authenticate, authorize(["superadmin", "manager", "viewer"]), async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      //.populate('user', 'firstname lastname email')
      .populate('serviceId', 'title body image startingPrice')
      //.populate('vehicleType', 'name pricePerKm');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Optionally restrict access to user's own bookings unless admin
    /* if (req.user.role !== 'admin' && booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    } */

    res.status(200).json({
      message: 'Booking fetched successfully',
      data: booking,
    });
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
