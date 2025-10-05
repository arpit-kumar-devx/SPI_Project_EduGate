const Session = require('../models/Session');
const responseHandler = require('../utils/responseHandler');

const createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    responseHandler.success(res, { session }, 201);
  } catch (error) {
    console.error('Create session error:', error);
    responseHandler.error(res, 'Failed to create session', 500);
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    responseHandler.success(res, { sessions });
  } catch (error) {
    console.error('Get sessions error:', error);
    responseHandler.error(res, 'Failed to fetch sessions', 500);
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return responseHandler.error(res, 'Session not found', 404);
    responseHandler.success(res, { session });
  } catch (error) {
    console.error('Get session error:', error);
    responseHandler.error(res, 'Failed to fetch session', 500);
  }
};

const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) return responseHandler.error(res, 'Session not found', 404);
    responseHandler.success(res, { session });
  } catch (error) {
    console.error('Update session error:', error);
    responseHandler.error(res, 'Failed to update session', 500);
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) return responseHandler.error(res, 'Session not found', 404);
    responseHandler.success(res, { message: 'Session deleted' });
  } catch (error) {
    console.error('Delete session error:', error);
    responseHandler.error(res, 'Failed to delete session', 500);
  }
};

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
};
