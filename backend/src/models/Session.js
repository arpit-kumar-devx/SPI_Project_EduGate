const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Session name is required'],
    trim: true
  },
  startDate: Date,
  endDate: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);
