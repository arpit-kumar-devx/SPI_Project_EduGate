const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // JWT verification
const adminAuth = require('../middleware/adminAuth'); // Only for admin/superadmin
const eventCtrl = require('../controllers/eventController');

// All routes here require authentication & admin privileges
router.use(auth, adminAuth);

// Create a new event
router.post('/', eventCtrl.createEvent);

// Get all events
router.get('/', eventCtrl.getEvents);

// Get single event by ID
router.get('/:id', eventCtrl.getEventById);

// Update event
router.put('/:id', eventCtrl.updateEvent);

// Delete event
router.delete('/:id', eventCtrl.deleteEvent);

module.exports = router;
