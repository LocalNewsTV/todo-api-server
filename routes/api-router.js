import express from 'express';
import {getItemsFromList, addItemToList, removeOneItemFromList} from '../controllers/list-api-controller.js';
import {signIn, signUp} from '../controllers/user-api-controller.js';
const router = express.Router();

router.route('/list')
.get(getItemsFromList)
.post(addItemToList)
.delete(removeOneItemFromList);
router.route('/login')
.post(signIn);

router.route('/signup')
.post(signUp);

router.route('/health')
.get((req, res)=>{
  res.status(200).send("Successful API GET Request - Health");
})
export default router;