const Event = require('../models/Event');
const responseHandler = require('../utils/responseHandler');

const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    responseHandler.success(res, { event }, 201);
  } catch (error) {
    console.error('Create event error:', error);
    responseHandler.error(res, 'Failed to create event', 500);
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    responseHandler.success(res, { events });
  } catch (error) {
    console.error('Get events error:', error);
    responseHandler.error(res, 'Failed to fetch events', 500);
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return responseHandler.error(res, 'Event not found', 404);
    responseHandler.success(res, { event });
  } catch (error) {
    console.error('Get event error:', error);
    responseHandler.error(res, 'Failed to fetch event', 500);
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return responseHandler.error(res, 'Event not found', 404);
    responseHandler.success(res, { event });
  } catch (error) {
    console.error('Update event error:', error);
    responseHandler.error(res, 'Failed to update event', 500);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return responseHandler.error(res, 'Event not found', 404);
    responseHandler.success(res, { message: 'Event deleted' });
  } catch (error) {
    console.error('Delete event error:', error);
    responseHandler.error(res, 'Failed to delete event', 500);
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
