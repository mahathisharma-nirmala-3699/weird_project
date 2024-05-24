import express from  'express'

const router = express.Router();

import {dashBoard} from '../controllers/authController.js'
import authorization from '../middleware/authorization.js';

router.get('/protected'  , dashBoard ,authorization);


export default router;