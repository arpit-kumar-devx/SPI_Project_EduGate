const Course = require('../models/Course');
const responseHandler = require('../utils/responseHandler');

// Create new course
const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    responseHandler.success(res, { course }, 201);
  } catch (error) {
    console.error('Create course error:', error);
    responseHandler.error(res, 'Failed to create course', 500);
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    responseHandler.success(res, { courses });
  } catch (error) {
    console.error('Get courses error:', error);
    responseHandler.error(res, 'Failed to fetch courses', 500);
  }
};

// Get course by id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return responseHandler.error(res, 'Course not found', 404);
    }
    responseHandler.success(res, { course });
  } catch (error) {
    console.error('Get course error:', error);
    responseHandler.error(res, 'Failed to fetch course', 500);
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return responseHandler.error(res, 'Course not found', 404);
    responseHandler.success(res, { course });
  } catch (error) {
    console.error('Update course error:', error);
    responseHandler.error(res, 'Failed to update course', 500);
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return responseHandler.error(res, 'Course not found', 404);
    responseHandler.success(res, { message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    responseHandler.error(res, 'Failed to delete course', 500);
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};
