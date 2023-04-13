import express from 'express';
import {getItemsFromList, addItemToList} from '../controllers/list-api-controller.js';
import {signIn, signUp} from '../controllers/user-api-controller.js';
const router = express.Router();

router.route('/list')
.get(getItemsFromList)
.post(addItemToList);

router.route('/login')
.post(signIn);

router.route('/signup')
.post(signUp);
export default router;