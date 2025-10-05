const fs = require('fs');
const path = require('path');

// Create upload directories
const uploadDirs = ['uploads', 'uploads/documents'];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('🚀 EduGate Backend setup complete!');
