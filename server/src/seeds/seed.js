import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hangman_db';

const seedUsers = [
  {
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1', // Ensure this is hashed if you use hashing middleware
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2', // Ensure this is hashed if you use hashing middleware
  },
  // Add more users as needed
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Insert seed users
    await User.insertMany(seedUsers);
    console.log('Inserted seed users');

    mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
