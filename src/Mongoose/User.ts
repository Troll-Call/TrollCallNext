import mongoose from 'mongoose';
import { MongooseFlair } from './Flair';

export const UserSchema = new mongoose.Schema({
  user: {type: String, required: true},
  url: String,
  flairs: [{ type: mongoose.Schema.Types.ObjectId, ref: MongooseFlair}],
});

export const MongooseUser = mongoose.models.User || mongoose.model('User', UserSchema, "users");