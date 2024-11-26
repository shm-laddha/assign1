import mongoose from 'mongoose';
import { env } from '../../config';

export const establishMongoConnection = async () => {
  try {
    await mongoose.connect(env.MONGO_URL);
    console.log('MongoDb Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
