import mongoose from 'mongoose';
import argon2 from 'argon2';
const usersModel = mongoose.model('Users');

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
