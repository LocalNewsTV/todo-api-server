import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();
const usersModel = mongoose.model('users');



passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log("USERNAME:",username);
    usersModel.findOne({
      '$or': [
        { email: username },
        { username: username }
      ]
    })
    .exec( async (error, user) => {
      console.log(user);
      if(error) return done(error);
      //no user found
      if(!user) return done(null, false);
      if(!await user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    })
  }
))
export const signIn = (req, res) => {
  jwt.sign(
    { 
      sub: req.user._id,
      username: req.user.username 
    },
    process.env.JWT_SECRET,
    { expiresIn: '60m' },
    (error, token) => {
      if(error) {
        res.status(400).send('Bad Request. Couldn\'t generate token');
      }
      else {
        res.status(200).json({token});
      }
    }
  )
}

export const signUp = async (req, res) => {
  if(!await checkUserIsTaken(req.body.email, req.body.username)){
    const message = await usersModel.create(req.body);
    res.status(201).send("User Created");
  } else {
    res.status(200).send("Username or Email is already in use");
  }
}

const checkUserIsTaken = async (email, username) => {
  return await usersModel.exists({
    '$or': [
      { email: email },
      { username: username }
    ]
  })
};
