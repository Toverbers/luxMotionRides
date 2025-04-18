const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String },
  startingPrice: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
