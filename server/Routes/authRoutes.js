import express from  'express'

const router = express.Router();
import {loginAccount, createAccount, updateAccount, deleteAccount, verifyToken} from '../controllers/authController.js'
import validInfo from '../middleware/validInfo.js';
import authorization from '../middleware/authorization.js';

router.post('/register', createAccount, validInfo)
router.post('/login', loginAccount , validInfo)

router.post('/verify',verifyToken, authorization);
router.put('/:id',updateAccount);
router.delete('/id', deleteAccount);


export default router;