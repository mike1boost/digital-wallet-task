import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/digital_wallet';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};

export const closeDatabaseConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error closing the database connection:', error);
    throw error;
  }
};
