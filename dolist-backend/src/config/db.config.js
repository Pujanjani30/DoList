import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`, {
      useNewUrlParser: true
    });
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit if DB connection fails
  }
};

export default connectDB;
