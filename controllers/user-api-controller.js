import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const usersModel = mongoose.model('Users');

passport.use(new LocalStrategy(
  (username, password, done) => {
    usersModel.findOne({
      'or': [
        { email: username },
        { username: username }
      ]
    })
    .exec( async (error, user) => {
      if(error) return done(error);
      //no user found
      if(!user) return done(null, false);
      if(!await user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    })
  }
))
export const signIn = (req, res) => {
  res.status(200).send('Successful API POST Request - Sign in');
}

export const signUp = async (req, res) => {
  if(!await checkUserIsTaken(req.body.email, req.body.username)){
    const message = await usersModel.create(req.body);
    res.status(201).send("User Created");
  } else {
    res.status(200).send("Username of Email is already in use");
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
