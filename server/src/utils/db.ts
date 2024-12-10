// src/utils/db.ts
import mongoose from 'mongoose';

// MongoDB URI for your local MongoDB instance or MongoDB Atlas
const MONGO_URI = 'mongodb://localhost:27017/hangman_db'; // Or use MongoDB Atlas connection string

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
