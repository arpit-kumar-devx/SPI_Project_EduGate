// const Student = require('../models/Student');
// const { validationResult } = require('express-validator');
// const responseHandler = require('../utils/responseHandler');

// // Submit student application
// const submitApplication = async (req, res) => {
//   try {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return responseHandler.validationError(res, errors.array());
//     }

//     // Create new student application
//     const studentData = {
//       personalDetails: {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         phone: req.body.phone,
//         dateOfBirth: req.body.dateOfBirth,
//         gender: req.body.gender,
//         fatherName: req.body.fatherName,
//         motherName: req.body.motherName,
//         address: req.body.address,
//         city: req.body.city,
//         state: req.body.state,
//         pincode: req.body.pincode,
//         category: req.body.category,
//         nationality: req.body.nationality || 'Indian',
//         bloodGroup: req.body.bloodGroup,
//         emergencyContact: req.body.emergencyContact
//       },
//       academicDetails: {
//         course: req.body.course,
//         session: req.body.session,
//         previousSchool: req.body.previousSchool,
//         boardUniversity: req.body.boardUniversity,
//         passingYear: req.body.passingYear,
//         percentage: req.body.percentage,
//         subjects: req.body.subjects
//       },
//       applicationDate: req.body.applicationDate || new Date()
//     };

//     const student = new Student(studentData);
//     await student.save();

//     // Send success response with application details
//     responseHandler.success(res, {
//       message: 'Application submitted successfully!',
//       application: {
//         applicationId: student.applicationId,
//         name: `${student.personalDetails.firstName} ${student.personalDetails.lastName}`,
//         course: student.academicDetails.course,
//         session: student.academicDetails.session,
//         applicationDate: student.applicationDate,
//         status: student.applicationStatus
//       }
//     }, 201);

//   } catch (error) {
//     console.error('Application submission error:', error);
    
//     // Handle duplicate email error
//     if (error.code === 11000) {
//       return responseHandler.error(res, 'Email already exists. Please use a different email address.', 400);
//     }
    
//     responseHandler.error(res, 'Failed to submit application. Please try again.', 500);
//   }
// };

// // Get application status by application ID
// const getApplicationStatus = async (req, res) => {
//   try {
//     const { applicationId } = req.params;
    
//     const student = await Student.findOne({ applicationId }).select(
//       'applicationId personalDetails.firstName personalDetails.lastName academicDetails.course academicDetails.session applicationStatus applicationDate adminNotes'
//     );

//     if (!student) {
//       return responseHandler.error(res, 'Application not found', 404);
//     }

//     responseHandler.success(res, {
//       application: student
//     });

//   } catch (error) {
//     console.error('Get application status error:', error);
//     responseHandler.error(res, 'Failed to fetch application status', 500);
//   }
// };

// // Get all applications (for admin)
// const getAllApplications = async (req, res) => {
//   try {
//     const { status, course, session, page = 1, limit = 10 } = req.query;
    
//     // Build filter object
//     const filter = {};
//     if (status) filter.applicationStatus = status;
//     if (course) filter['academicDetails.course'] = course;
//     if (session) filter['academicDetails.session'] = session;

//     // Pagination
//     const skip = (page - 1) * limit;
    
//     const students = await Student.find(filter)
//       .select('applicationId personalDetails academicDetails applicationStatus applicationDate')
//       .sort({ applicationDate: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     const totalApplications = await Student.countDocuments(filter);
    
//     responseHandler.success(res, {
//       applications: students,
//       pagination: {
//         currentPage: parseInt(page),
//         totalPages: Math.ceil(totalApplications / limit),
//         totalApplications,
//         limit: parseInt(limit)
//       }
//     });

//   } catch (error) {
//     console.error('Get all applications error:', error);
//     responseHandler.error(res, 'Failed to fetch applications', 500);
//   }
// };

// // Get single application details (for admin)
// const getApplicationDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     const student = await Student.findById(id).populate('reviewedBy', 'email');

//     if (!student) {
//       return responseHandler.error(res, 'Application not found', 404);
//     }

//     responseHandler.success(res, {
//       application: student
//     });

//   } catch (error) {
//     console.error('Get application details error:', error);
//     responseHandler.error(res, 'Failed to fetch application details', 500);
//   }
// };

// // Update application status (for admin)
// const updateApplicationStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminNotes } = req.body;
    
//     const validStatuses = ['pending', 'approved', 'rejected', 'waitlisted'];
//     if (!validStatuses.includes(status)) {
//       return responseHandler.error(res, 'Invalid status provided', 400);
//     }

//     const student = await Student.findByIdAndUpdate(
//       id,
//       {
//         applicationStatus: status,
//         adminNotes: adminNotes,
//         reviewedBy: req.user.id, // From auth middleware
//         reviewedDate: new Date()
//       },
//       { new: true }
//     ).select('applicationId personalDetails.firstName personalDetails.lastName applicationStatus adminNotes reviewedDate');

//     if (!student) {
//       return responseHandler.error(res, 'Application not found', 404);
//     }

//     responseHandler.success(res, {
//       message: `Application status updated to ${status}`,
//       application: student
//     });

//   } catch (error) {
//     console.error('Update application status error:', error);
//     responseHandler.error(res, 'Failed to update application status', 500);
//   }
// };

// // Get dashboard statistics
// const getDashboardStats = async (req, res) => {
//   try {
//     const totalApplications = await Student.countDocuments();
//     const pendingApplications = await Student.countDocuments({ applicationStatus: 'pending' });
//     const approvedApplications = await Student.countDocuments({ applicationStatus: 'approved' });
//     const rejectedApplications = await Student.countDocuments({ applicationStatus: 'rejected' });
    
//     // Recent applications (last 7 days)
//     const sevenDaysAgo = new Date();
//     sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
//     const recentApplications = await Student.countDocuments({ 
//       applicationDate: { $gte: sevenDaysAgo } 
//     });

//     responseHandler.success(res, {
//       stats: {
//         total: totalApplications,
//         pending: pendingApplications,
//         approved: approvedApplications,
//         rejected: rejectedApplications,
//         recent: recentApplications
//       }
//     });

//   } catch (error) {
//     console.error('Get dashboard stats error:', error);
//     responseHandler.error(res, 'Failed to fetch dashboard statistics', 500);
//   }
// };

// module.exports = {
//   submitApplication,
//   getApplicationStatus,
//   getAllApplications,
//   getApplicationDetails,
//   updateApplicationStatus,
//   getDashboardStats
// };


const Student = require('../models/Student');

exports.apply = async (req, res) => {
  const student = await Student.create({
    personalDetails: req.body.personalDetails,
    academicDetails: req.body.academicDetails
  });
  res.status(201).json({ success: true, message: "Application submitted", student });
};
