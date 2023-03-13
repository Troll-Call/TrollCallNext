import mongoose from 'mongoose';

export const TimeMeasureSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    enum: ['sweeps', 'years'],
  },
});

export const HeightMeasureSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    enum: ['inches', 'meters'],
  },
});

export const NameSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
    validate: {
      validator: function(val:string) {
        return val.toString().length === 6;
      },
      message: "First name has to be exactly 6 characters"
    }
  },
  last: {
    type: String,
    required: true,
    validate: {
      validator: function(val:string) {
        return val.toString().length === 6;
      },
      message: "Last name has to be exactly 6 characters"
    }
  },
});

export const PronunciationSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
});

export const PreferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  opinion: {
    type: String,
    enum: ['loves', 'likes', 'neutral', 'dislikes', 'hates'],
    required: true
  },
});

export const QuirkFunctionSchema = new mongoose.Schema({
  function: {
    type: String,
    required: true
  },
  arguments: [String],
});

export const LogSchema = new mongoose.Schema({
  character: { type: Number, required: true },
  text: { type: String, required: true },
  action: {
    text: { type: String },
    time: { type: String },
  },
  quirk: { type: String },
});

export const CharacterStatusSchema = new mongoose.Schema({
  character: { type: mongoose.Types.ObjectId, ref: "Troll", required: true },
  time: { type: String },
});