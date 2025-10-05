const router = require('express').Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { getApplications, approveApplication } = require('../controllers/adminController');
const adminCtrl = require('../controllers/adminController');

router.use(auth, adminAuth);
router.get('/applications', adminCtrl.getApplications);
router.put('/applications/:id/approve', adminCtrl.approveApplication);
router.put('/applications/:id/reject', adminCtrl.rejectApplication);

module.exports = router;
