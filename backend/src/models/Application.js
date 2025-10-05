const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicationId: String,
  personalDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String
  },
  academicDetails: {
    course: String,
    session: String,
    previousSchool: String,
    percentage: String
  },
  applicationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
