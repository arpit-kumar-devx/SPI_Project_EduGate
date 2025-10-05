module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/edugate',
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_jwt_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  
  // Email configuration
  EMAIL: {
    HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
    PORT: process.env.EMAIL_PORT || 587,
    USER: process.env.EMAIL_USER || '',
    PASS: process.env.EMAIL_PASS || ''
  },
  
  // File upload configuration
  UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
  }
};
