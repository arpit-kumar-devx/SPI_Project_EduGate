const Fee = require('../models/Fee');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const responseHandler = require('../utils/responseHandler');

// Initialize Razorpay only if credentials are available
let razorpay;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_SECRET) {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });
  } else {
    console.warn('Razorpay credentials not found in environment variables. Payment features will be disabled.');
  }
} catch (error) {
  console.error('Failed to initialize Razorpay:', error);
}

// List all fees info
const getFees = async (req, res) => {
  try {
    const fees = await Fee.find().populate('studentId', 'personalDetails');
    responseHandler.success(res, { fees });
  } catch (error) {
    console.error('Get fees error:', error);
    responseHandler.error(res, 'Failed to fetch fees', 500);
  }
};

// Create a Razorpay order for testing payment
const createOrder = async (req, res) => {
  try {
    if (!razorpay) {
      return responseHandler.error(res, 'Razorpay is not configured. Please add your Razorpay credentials to the .env file.', 500);
    }
    
    const { amount, currency = 'INR', receipt } = req.body;
    const options = {
      amount: amount * 100, // in smallest currency unit (paise)
      currency,
      receipt: receipt || `receipt_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Create order error:', error);
    responseHandler.error(res, 'Failed to create order', 500);
  }
};

// Verify payment signature from Razorpay
const verifyPayment = async (req, res) => {
  try {
    if (!process.env.RAZORPAY_SECRET) {
      return responseHandler.error(res, 'Razorpay is not configured. Please add your Razorpay credentials to the .env file.', 500);
    }
    
    const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
    if (!orderId || !razorpayPaymentId || !razorpaySignature) {
      return responseHandler.error(res, 'Missing required parameters', 400);
    }

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (generatedSignature === razorpaySignature) {
      responseHandler.success(res, { message: 'Payment verified successfully' });
    } else {
      responseHandler.error(res, 'Payment verification failed', 400);
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    responseHandler.error(res, 'Failed to verify payment', 500);
  }
};

// Update fee payment status (e.g., mark as paid)
const updateFeeStatus = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status || 'paid' },
      { new: true }
    );
    if (!fee) return responseHandler.error(res, 'Fee record not found', 404);
    responseHandler.success(res, { fee });
  } catch (error) {
    console.error('Update fee status error:', error);
    responseHandler.error(res, 'Failed to update fee status', 500);
  }
};

module.exports = {
  getFees,
  createOrder,
  verifyPayment,
  updateFeeStatus
};
