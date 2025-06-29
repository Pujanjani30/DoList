import mongoose from 'mongoose';

mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`)
  .then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));