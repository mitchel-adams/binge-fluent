import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const mongoOptions = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
  useUnifiedTopology: true,
};

const userDb = mongoose.createConnection(process.env.MONGO_URI_USERS, mongoOptions);

userDb.on('error', (error) => {
  console.error('User DB connection error:', error);
});
userDb.once('open', async () => {
  console.log('Connected to User Database');
  
  const testUser = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123'
  });

  try {
    await testUser.save();
    console.log('User saved successfully');
  } catch (error) {
    console.error('Error saving user:', error);
  } finally {
    userDb.close();
  }
});
