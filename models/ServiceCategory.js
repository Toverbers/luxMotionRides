const mongoose = require('mongoose');

const ServiceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);
