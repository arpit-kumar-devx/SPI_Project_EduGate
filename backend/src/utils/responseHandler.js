class ResponseHandler {
  static success(res, data, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      ...data
    });
  }

  static error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  static validationError(res, errors) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
}

module.exports = ResponseHandler;
