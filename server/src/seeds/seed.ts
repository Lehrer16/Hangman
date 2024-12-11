import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User, { IUser } from '../models/user.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hangman_db';

const seedUsers: Partial<IUser>[] = [
  {
    username: 'user1',
    email: 'a@a.com',
    password: 'pass', // This will be hashed by the middleware
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2', // This will be hashed by the middleware
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

    // Insert seed users using `create` to trigger middleware
    for (const userData of seedUsers) {
      await User.create(userData);
    }
    console.log('Inserted seed users');

    mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
