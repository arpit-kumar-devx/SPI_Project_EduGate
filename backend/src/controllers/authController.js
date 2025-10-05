// src/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT Token
const genToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

/**
 * @desc    Login user (student, admin, superadmin)
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // ✅ fixed typo from req.nody

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // If no user found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is inactive. Please contact administrator."
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Generate JWT token with id & role in payload
    const token = genToken(user._id, user.role);

    // Success response
    res.json({
      success: true,
      token,
      role: user.role,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};
