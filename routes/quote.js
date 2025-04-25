const express = require('express');
const nodemailer = require('nodemailer');
const {generateQuoteEmailTemplate, generateAdminQuoteEmailTemplate} = require('../utils/quoteTemplate');
//const generateAdminQuoteEmailTemplate = require('../utils/quoteTemplate');
//const generateEmailTemplate = require('../utils/emailTemplate');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email, serviceType, firstname, lastname, phone, pickup, dropoff, noOfPeople, note } = req.body;

  if (!email || !serviceType || !firstname || !lastname || !phone || !pickup || !pickup || !dropoff || !noOfPeople || !note) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
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

    // Admin email content
    const adminHtml = generateAdminQuoteEmailTemplate({
      title: 'New Quote Request',
      email,
      serviceType,
      firstname,
      lastname,
      phone,
      pickup: pickup.address,
      pickupLatitude: pickup.latitude,
      pickupLongitude: pickup.longitude,
      dropoff: dropoff.address,
      dropoffLatitude: dropoff.latitude,
      dropoffLongitude: dropoff.longitude,
      noOfPeople,
      note,
      
    });

    // User confirmation email content
    const userHtml = generateQuoteEmailTemplate({
      title: 'Thank You for Contacting Us!',
      email,
      serviceType,
      firstname,
      lastname,
      phone,
      //pickup: `${pickup.address} latitude(${pickup.latitude}), longitude(${pickup.longitude})`,
      //dropoff: `${dropoff.address} latitude(${dropoff.latitude}), longitude(${dropoff.longitude})`,
      pickup: pickup.address,
      //pickupLatitude: pickup.latitude,
      //pickupLongitude: pickup.longitude,
      dropoff: dropoff.address,
      //dropoffLatitude: dropoff.latitude,
      //dropoffLongitude: dropoff.longitude,
      noOfPeople,
      note
    });

    // Send to Admin
    await transporter.sendMail({
      from: `"LuxMotion Rides" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Quote Request Form Submission',
      html: adminHtml
    });

    // Send to User
    await transporter.sendMail({
      from: `"LuxMotion Rides" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'We Received Your Message!',
      html: userHtml
    });



    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
