const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], lowercase: true },
  phone: String,
  message: { type: String, required: [true, 'Message is required'] },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  resolved: { type: Boolean, default: false },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
