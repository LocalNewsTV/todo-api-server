import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const usersModel = mongoose.model('users');
const listsModel = mongoose.model('list');

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

dotenv.config();

passport.use(new JwtStrategy(
  jwtOptions, (jwt_payload, done) => {
    usersModel.findById(jwt_payload.sub)
    .exec((error, user) => {
      //error in search
      if (error) return done(error);
      if (!user) {
        //user not found
        return done(null, false);
      } else {
        //user found
        return done(null, user);
      }
    });
  }
));

export const getItemsFromList = (req, res) => {
  res.status(200).send('Successful API GET Request');
}

export const addItemToList = async (req, res) => {
  res.status(200).send('Successful API POST Request.');
}

export const removeOneItemFromList = async ( req, res ) => {
  res.status(200).send('Successful API Delete Request');
}