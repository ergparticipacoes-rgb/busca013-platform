const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  propertyCode: String
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);