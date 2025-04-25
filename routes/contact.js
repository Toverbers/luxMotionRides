const express = require('express');
const nodemailer = require('nodemailer');
const generateEmailTemplate = require('../utils/emailTemplate');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  if (!firstname || !lastname || !email || !message) {
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
    const adminHtml = generateEmailTemplate({
      title: 'New Contact Message',
      adminName: 'Hello Admin',
      firstname,
      lastname,
      email,
      message: `<strong>Message:</strong><br/>${message}`,
      
    });

    // User confirmation email content
    const userHtml = generateEmailTemplate({
      title: 'Thank You for Contacting Us!',
      message: `We have received your message and will get back to you shortly.<br/><br/><em>Your message:</em><br/>${message}`,
      firstname: `Hi ${firstname}`,
      lastname
    });

    // Send to Admin
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Form Submission',
      html: adminHtml
    });

    // Send to User
    await transporter.sendMail({
      from: `"LuxMotion" <${process.env.EMAIL_USER}>`,
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
