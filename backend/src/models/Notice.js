const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notice title is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Notice message is required']
  },
  audience: {
    type: String,
    enum: ['all', 'students', 'admins'],
    default: 'all'
  },
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
