const Enquiry = require('../models/Enquiry');
const responseHandler = require('../utils/responseHandler');

// Get all enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    responseHandler.success(res, { enquiries });
  } catch (error) {
    console.error('Get enquiries error:', error);
    responseHandler.error(res, 'Failed to fetch enquiries', 500);
  }
};

// Mark enquiry as resolved
const resolveEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return responseHandler.error(res, 'Enquiry not found', 404);
    enquiry.resolved = true;
    await enquiry.save();
    responseHandler.success(res, { message: 'Enquiry marked as resolved' });
  } catch (error) {
    console.error('Resolve enquiry error:', error);
    responseHandler.error(res, 'Failed to resolve enquiry', 500);
  }
};

module.exports = {
  getEnquiries,
  resolveEnquiry
};
