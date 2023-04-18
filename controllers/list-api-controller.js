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

export const getItemsFromList = async (req, res) => {
  console.log(req.user.username, req.user._id)
  await listsModel.find({
    'listName': req.body.listName,
    'user': req.user.username
  }).then((response)=> res.status(200).send(JSON.stringify(response)))
  .catch(ex=>console.log("Error", ex));
  

}

export const addItemToList = async (req, res) => {
  const newItem = await listsModel.create({
    "user": req.user.username,
    ...req.body
  })
  res.status(200).send(newItem);
}

export const removeOneItemFromList = async ( req, res ) => {
  res.status(200).send('Successful API Delete Request');
}

export const getLists = async ( req, res) => {
  res.status(200).send(('Successful API List Request'));
}