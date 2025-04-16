const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  pickup: { 
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
   },
  dropoff: { 
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
   },
  airline: { type: String, required: true },
  flightNo: { type: String, required: true },
  checkedBag: { type: String, required: true },
  carryOn: { type: String, required: true },
  travelPet: { type: String, required: true },
  //location: { type: String, required: true },

});

module.exports = mongoose.model('Booking', BookingSchema);
