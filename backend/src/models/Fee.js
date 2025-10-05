const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'paid'], 
    default: 'pending' 
  },
  receiptUrl: String, // Link to uploaded PDF/image receipt
  paymentDate: Date,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String
}, { timestamps: true });

module.exports = mongoose.model('Fee', feeSchema);
