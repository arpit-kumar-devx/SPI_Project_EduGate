const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const noticeCtrl = require('../controllers/noticeController');

// All routes require admin/superadmin
router.use(auth, adminAuth);

// Create a new notice
router.post('/', noticeCtrl.createNotice);

// Fetch all notices
router.get('/', noticeCtrl.getNotices);

// Get notice by ID
router.get('/:id', noticeCtrl.getNoticeById);

// Update notice
router.put('/:id', noticeCtrl.updateNotice);

// Delete notice
router.delete('/:id', noticeCtrl.deleteNotice);

module.exports = router;
