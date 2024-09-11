import express from 'express';
import {signup , login , logout , getUser} from '../controllers/authController.js';
import {protect} from '../middlewares/authMiddleware.js'


const router = express.Router();


router.post('/signup' , signup);
router.post('/login' , login);
router.get('/logout' , logout);
router.get('/me' , protect , getUser)


export default router