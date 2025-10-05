const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*', // change to specific frontend URL in production
    credentials: true
  })
);
app.use(express.json()); // Parse JSON bodies

// ===== ROUTES =====

// Auth (login, register)
app.use('/api/auth', require('./src/routes/auth'));

// Admin dashboard related actions (admissions approval/reject, etc.)
app.use('/api/admin', require('./src/routes/admin'));

// Course management
app.use('/api/courses', require('./src/routes/courses'));

// Session management
app.use('/api/sessions', require('./src/routes/sessions'));

// Notice management
app.use('/api/notices', require('./src/routes/notices'));

// Event management
app.use('/api/events', require('./src/routes/events'));

// Enquiry management
app.use('/api/enquiries', require('./src/routes/enquiries'));

// Fee management (payment gateway testing)
app.use('/api/admin/fees', require('./src/routes/fees'));

app.use('/api/students',require('./src/routes/students'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend is running fine 🚀' });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
