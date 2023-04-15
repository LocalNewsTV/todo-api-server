import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
    match: /^[A-Za-z0-9]+$/
  },
  email: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 30,
    match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 64,
    format: 'password'
  }
});

export default mongoose.model('user', userSchema);