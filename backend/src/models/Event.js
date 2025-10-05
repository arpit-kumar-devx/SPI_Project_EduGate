const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required']
  },
  description: String,
  date: { type: Date },
  location: String,
  audience: {
    type: String,
    enum: ['all', 'students', 'admins'],
    default: 'all'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
