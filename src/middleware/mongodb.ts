import mongoose from 'mongoose';
import { NextApiResponse, NextApiRequest } from 'next';

const connectDB = handler => async (req : NextApiRequest, res : NextApiResponse) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.SERVER_ID ?? process.exit(0));
  return handler(req, res);
};

export default connectDB;
