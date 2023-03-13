import mongoose from 'mongoose';
import { LogSchema, CharacterStatusSchema } from './Schema';
import { MongooseUser } from './User';

export const PesterSchema = new mongoose.Schema({
  reference: {type: String, required: true},
  owners: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: MongooseUser}], required: true},
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Number, required: true },
  characters: [CharacterStatusSchema],
  log: [LogSchema],
});

export const MongoosePester = mongoose.models.Pester || mongoose.model("Pester", PesterSchema, "pesters");