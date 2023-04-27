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
  res.status(201).send(newItem);
}

export const removeOneItemFromList = async ( req, res ) => {
  try{
    const delItem = await listsModel.deleteOne({
      'id': req.body.id,
      'username': req.user.username
    })
    res.status(200).send(delItem);
  } catch(ex) {
    res.status()
  }
}

export const getLists = async ( req, res ) => {
  try{
    const items = await usersModel.find({'username': req.user.username,
    })
    res.status(200).send(JSON.stringify(items[0].lists));
  } catch (ex){
    res.status(500).send("Internal Server Error");
  }
}

export const addToUsersLists = async ( req, res) => {
  try {
    const check = await usersModel.find({'username': req.user.username});
    console.log(check);
    if(!check[0].lists.includes(req.body.newItem)){ 
      await usersModel.findOneAndUpdate({
          'username': req.user.username,
      },
      {'$push': {"lists": req.body.newItem }})
      res.status(201).send("New Item Added");
    } else {
      res.status(409).send("List already exists");
    }
  } catch(ex) {
    console.log(ex);
    res.status(400).send("Invalid Data sent");
  }
}

export const removeFromUsersLists = async ( req, res ) => { 
  try {
    const check = await usersModel.find({'username': req.user.username});
    if(check[0].lists.includes(req.body.list)) {
      await usersModel.findOneAndUpdate({
        'username': req.user.username
      }, { $pull: {
        lists: req.body.list
      }}
      )
      await listsModel.deleteMany({
        'username': req.user.username,
        'listName': req.body.list 
      })
      res.status(204).send("Deleted");
    } else {
      res.status(404).send("User not found")
    }
  } catch(ex) {
    console.log(ex);
    res.status(400).send("Bad Request");
  }
} 