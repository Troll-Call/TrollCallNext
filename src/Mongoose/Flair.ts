import mongoose from 'mongoose';

export const FlairSchema = new mongoose.Schema({
  name: String,
  color: {
    type: [Number], 
    validate: function(val:Number[]) { 
      return val.length === 3; 
    }
  }
});

export const MongooseFlair = mongoose.models.Flair || mongoose.model('Flair', FlairSchema, "flairs");