const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const enquiryCtrl = require('../controllers/enquiryController');

// Basic enquiry route (for contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // For now, just return success (you can add database saving later)
    res.json({ 
      success: true, 
      message: 'Enquiry submitted successfully. We will contact you soon.' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit enquiry' });
  }
});
// All routes require authentication & admin privileges
router.use(auth, adminAuth);

// Get all enquiries
router.get('/', enquiryCtrl.getEnquiries);

// Mark enquiry as resolved
router.put('/:id/resolve', enquiryCtrl.resolveEnquiry);

module.exports = router;
