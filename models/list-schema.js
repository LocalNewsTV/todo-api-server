import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
    match: /^[A-Za-z0-9]+$/
  },
  listName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 18,
    match: /^[A-Za-z ]+$/
  },
  contents: [{
    item: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
    }, 
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

listSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => { delete ret._id; }
});

export default mongoose.model('list', listSchema);