const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edugate';

async function seedSuperAdmin() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    const email = 'superadmin@recmirzapur.edu'.toLowerCase();
    const password = 'SuperAdmin@123';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠ Super admin already exists with this email.');
      process.exit(0);
    }

    const superAdmin = new User({
      email,
      password, // let schema hash automatically
      role: 'superadmin',
      isActive: true
    });

    await superAdmin.save();

    console.log(`✅ Super admin created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding super admin:', error);
    process.exit(1);
  }
}

seedSuperAdmin();
