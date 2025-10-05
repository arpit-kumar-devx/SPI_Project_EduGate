const Application = require('../models/Application');
const Student = require('../models/Student');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const emailService = require('../services/emailService');

// Get pending applications
exports.getApplications = async (req, res) => {
  const apps = await Application.find();
  res.json({ success: true, applications: apps });
};

// Approve application
exports.approveApplication = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ success: false, message: 'Not found' });

  // Create student user
  const tempPass = Math.random().toString(36).slice(-8);
  const newUser = await User.create({
    email: app.personalDetails.email,
    password: tempPass,
    role: 'student'
  });

  // Move to students collection
  await Student.create({
    personalDetails: app.personalDetails,
    academicDetails: app.academicDetails,
    applicationId: app.applicationId,
    applicationStatus: 'approved'
  });

  // Update app status
  app.applicationStatus = 'approved';
  await app.save();

  await emailService.sendStudentCredentials(app.personalDetails.email, {
    name: `${app.personalDetails.firstName}`,
    username: app.personalDetails.email,
    password: tempPass
  });

  res.json({ success: true, message: 'Approved and email sent' });
};

// Reject application
exports.rejectApplication = async (req, res) => {
  const app = await Application.findById(req.params.id);
  if (!app) return res.status(404).json({ success: false, message: 'Not found' });

  app.applicationStatus = 'rejected';
  await app.save();

  await emailService.sendRejectionEmail(app.personalDetails.email);
  res.json({ success: true, message: 'Rejected and email sent' });
};
