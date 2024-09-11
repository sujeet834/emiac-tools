import express from 'express';
import {protect , adminOnly} from '../middlewares/authMiddleware.js';
import User from '../models/userModel.js'

const router = express.Router();

router.get('/users' ,protect , adminOnly , async (req , res)=>{
    try {
        const users = await User.find({});
        res.status(200).json({success:true , data:users})
    } catch (error) {
        res.status(400).json({success: false , error : error.message})
    }
})

export default router