const mongoose = require('mongoose');

const AdminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'manager', 'viewer'], default: 'viewer' },
});

module.exports = mongoose.model('AdminUser', AdminUserSchema);
