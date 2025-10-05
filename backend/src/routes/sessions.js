const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const sessionCtrl = require('../controllers/sessionController');

// All routes require admin privileges
router.use(auth, adminAuth);

// Create a new academic session
router.post('/', sessionCtrl.createSession);

// Get all sessions
router.get('/', sessionCtrl.getSessions);

// Get session by ID
router.get('/:id', sessionCtrl.getSessionById);

// Update a session
router.put('/:id', sessionCtrl.updateSession);

// Delete a session
router.delete('/:id', sessionCtrl.deleteSession);

module.exports = router;
