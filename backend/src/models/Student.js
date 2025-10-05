const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  personalDetails: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    fatherName: String,
    category: String,
    address: String
  },
  academicDetails: {
    course: String,
    session: String,
    previousSchool: String,
    percentage: String
  },
  applicationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
