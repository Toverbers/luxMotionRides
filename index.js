require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoute = require('./routes/contact');
const faqRoutes = require('./routes/faq');
const uploadRoute = require('./routes/upload');
const reviewRoute = require('./routes/review');
const serviceCategoryRoute = require('./routes/serviceCategory');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  //useUnifiedTopology: true,
  
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/v1/auth/admin/login', require('./routes/auth'));
app.use('/api/v1/services', require('./routes/services'));
app.use('/api/v1/bookings', require('./routes/bookings'));
app.use('/api/v1/contact', contactRoute);
app.use('/api/v1/quote', require('./routes/quote'));
app.use('/api/v1/faqs', faqRoutes);
app.use('/api/v1', uploadRoute);
app.use('/api/v1', reviewRoute);
app.use('/api/v1/category', serviceCategoryRoute);
app.use('/api/v1/admin/stats', require('./routes/adminStats'));          // Admin dashboard stats
app.use('/api/v1/visitor', require('./routes/visitor'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
