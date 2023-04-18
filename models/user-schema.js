import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
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

userSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => { delete ret._id; }
});

//Pre-hook to Saly and Hash password using argon2id
userSchema.pre('save', async function() {
  try {
    //Hash and salt password
    const hash = await argon2.hash(this.password, {
      type: argon2.argon2id
    });
    this.password = hash;
  } catch (ex) {
    console.log('Error in Hashing process: ', ex);
  }
});

userSchema.methods.verifyPassword = 
async function(plainTextPassword) {
  const dbHashedPassword = this.password;
  try {
    return await argon2.verify(dbHashedPassword, plainTextPassword);
  } catch (ex) {
    console.log('Error verifying password:', err);
  }
}
export default mongoose.model('users', userSchema);