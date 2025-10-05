const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // JWT auth middleware
const adminAuth = require('../middleware/adminAuth'); // Only allow admin/superadmin
const courseCtrl = require('../controllers/courseController');

// All routes here require logged-in admin
router.use(auth, adminAuth);

// Create a new course
router.post('/', courseCtrl.createCourse);

// List all courses
router.get('/', courseCtrl.getCourses);

// Get course by ID
router.get('/:id', courseCtrl.getCourseById);

// Update a course
router.put('/:id', courseCtrl.updateCourse);

// Delete a course
router.delete('/:id', courseCtrl.deleteCourse);

module.exports = router;
