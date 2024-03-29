import express from 'express';
import {getItemsFromList, addItemToList, removeOneItemFromList, getLists, addToUsersLists, removeFromUsersLists} from '../controllers/list-api-controller.js';
import {signIn, signUp} from '../controllers/user-api-controller.js';
import { fetchWeather } from '../controllers/weather-api-controller.js';
import passport from 'passport';
const router = express.Router();

router.route('/userlists')
.get(passport.authenticate('jwt', { session: false }), getLists)
.patch(passport.authenticate('jwt', { session: false }), addToUsersLists)
.delete(passport.authenticate('jwt', { session: false}), removeFromUsersLists);

router.route('/list')
.post(passport.authenticate('jwt', {session: false }), addItemToList)
.delete(passport.authenticate('jwt', {session: false }), removeOneItemFromList);

router.route('/listItems')
.post(passport.authenticate('jwt', {session: false}), getItemsFromList);

router.route('/login')
.post(passport.authenticate('local', { session: false }), signIn);

router.route('/signup')
.post(signUp);

router.route('/weather')
.post(fetchWeather);
router.route('/health')
.get((req, res)=>{
  res.status(200).send("Successful API GET Request - Health");
})
export default router;