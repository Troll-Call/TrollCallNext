import mongoose from 'mongoose';
import { HeightMeasureSchema, TimeMeasureSchema, NameSchema, PronunciationSchema, PreferenceSchema, QuirkFunctionSchema } from './Schema';
import { MongooseUser } from './User';

export const TrollSchema = new mongoose.Schema({
  reference: {type: String, required: true,
    validate: {
      validator: function(val:string) {
        return val.length === 6 && val.toLowerCase() === val;
      },
      message: "ID has to be exactly 6 characters and lowercase"
    }
  },
  owners: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: MongooseUser}], required: true},
  name: {type: NameSchema, required: true},
  pronunciation: {type: PronunciationSchema, required: true},
  username: {type: String, required: true},
  description: {type: String, required: true},
  age: TimeMeasureSchema,
  sign: {
    extended: {type: String, required: true},
    sign: {
      type: Number,
      min: 0,
      max: 11,
      required: true
    }
  },
  species: {type: String, required: true},
  pronouns: {type: [{type: [String], String: function(val:String[]) { return val.length === 2; }}], required: true},
  gender: {type: String, required: true},
  height: HeightMeasureSchema,
  colors: {type: [
    {
      type: [Number], 
      validate: function(val:Number[]) {
        return val.length === 3; 
      }
    }
  ], required: true},
  policies: {
    fanart: {
      type: String,
      required: true,
      enum: ['yes', 'ask', 'no'],
    },
    fanartOthers: {
      type: String,
      required: true,
      enum: ['yes', 'ask', 'no'],
    },
    kinning: {
      type: String,
      required: true,
      enum: ['yes', 'ask', 'no'],
    },
    shipping: {
      type: String,
      required: true,
      enum: ['yes', 'ask', 'no'],
    },
    fanfiction: {
      type: String,
      required: true,
      enum: ['yes', 'ask', 'no'],
    },
  },
  likes: {type: [PreferenceSchema], required: true},
  facts: {type: [String], required: true},
  quirks: {
    type: Map,
    of: [QuirkFunctionSchema],
    required: true
  },
});

export const MongooseTroll = mongoose.models.Troll || mongoose.model("Troll", TrollSchema, "trolls");