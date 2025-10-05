const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  code: {
    type: String,
    trim: true,
    unique: true
  },
  duration: {
    type: String
  },
  fees: {
    type: Number
  },
  description: String,
  eligibility: String,
  seats: {
    total: Number,
    available: Number
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Ensure seats.available is equal to seats.total when first created
courseSchema.pre('save', function (next) {
  if (this.isNew && this.seats?.total && !this.seats?.available) {
    this.seats.available = this.seats.total;
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
