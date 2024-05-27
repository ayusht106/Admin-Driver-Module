const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tempPassword: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  vehicle: {
    type: String,
    enum: ['Truck', 'Car', 'Pickup Truck', 'Motorcycle'],
  },
  status: { 
    type: Boolean, 
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Driver', driverSchema);