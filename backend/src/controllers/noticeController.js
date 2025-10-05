const Notice = require('../models/Notice');
const responseHandler = require('../utils/responseHandler');

const createNotice = async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();
    responseHandler.success(res, { notice }, 201);
  } catch (error) {
    console.error('Create notice error:', error);
    responseHandler.error(res, 'Failed to create notice', 500);
  }
};

const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find();
    responseHandler.success(res, { notices });
  } catch (error) {
    console.error('Get notices error:', error);
    responseHandler.error(res, 'Failed to fetch notices', 500);
  }
};

const getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) return responseHandler.error(res, 'Notice not found', 404);
    responseHandler.success(res, { notice });
  } catch (error) {
    console.error('Get notice error:', error);
    responseHandler.error(res, 'Failed to fetch notice', 500);
  }
};

const updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notice) return responseHandler.error(res, 'Notice not found', 404);
    responseHandler.success(res, { notice });
  } catch (error) {
    console.error('Update notice error:', error);
    responseHandler.error(res, 'Failed to update notice', 500);
  }
};

const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return responseHandler.error(res, 'Notice not found', 404);
    responseHandler.success(res, { message: 'Notice deleted' });
  } catch (error) {
    console.error('Delete notice error:', error);
    responseHandler.error(res, 'Failed to delete notice', 500);
  }
};

module.exports = {
  createNotice,
  getNotices,
  getNoticeById,
  updateNotice,
  deleteNotice
};
