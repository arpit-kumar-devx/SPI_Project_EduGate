const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const feeCtrl = require('../controllers/feeController');

// All routes require authentication & admin privileges
router.use(auth, adminAuth);

// List all fees
router.get('/', feeCtrl.getFees);

// Create a Razorpay test order (for payments)
router.post('/create-order', feeCtrl.createOrder);

// Verify Razorpay payment signature
router.post('/verify-payment', feeCtrl.verifyPayment);

// Update fee payment status (mark as paid/pending)
router.put('/:id/status', feeCtrl.updateFeeStatus);

module.exports = router;
