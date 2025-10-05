const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const studentAuth = require('../middleware/studentAuth'); // Check if user is student
const studentCtrl = require('../controllers/studentController');

router.use(auth, studentAuth);

// Get student profile
router.get('/profile', studentCtrl.getProfile);

// Get student's enquiries
router.get('/enquiries', studentCtrl.getEnquiries);

// Get student's fee information
router.get('/fees', studentCtrl.getFees);

module.exports = router;
