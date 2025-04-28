const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true
  },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  noOfPeople: { type: String,  }, 
  note: { type: String,  },
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
  airline: { type: String,  },
  flightNo: { type: String,  },
  checkedBag: { type: String,  },
  carryOn: { type: String,  },
  travelPet: { type: String,  },
  //location: { type: String, required: true },

});

module.exports = mongoose.model('Booking', BookingSchema);
