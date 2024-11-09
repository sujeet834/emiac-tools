import User from '../models/userModel.js'

export const signup = async (req , res)=>{
    try {
        const {username , email , password , role} = req.body;
        const user = await User.create({username , email , password : password , role: role || 2});
        req.session.userId = user._id;
        req.session.role = user.role;
        res.status(201).json({success:true , data:user})
    } catch (error) {
        res.status(400).json({success:false , error: error.message})
    }
}


export const login = async (req, res)=>{
    try {
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if (!user || !(await user.comparePassword(password))){
            return res.status(401).json({success:false , message:"Invalid credentials"});
        }
        req.session.userId = user._id;
        req.session.role = user.role;
          res.status(200).json({success:true , data:user});
    } catch (error) {
        res.status(400).json({success:false , error:error.message});
    }
}

export const logout = async (req ,res)=>{
    req.session.destroy();
    res.status(200).json({success:true , message:"Logged Out"})
}

export const getUser = async (req , res)=>{
    if(!req.session.userId){
        return res.status(401).json({success:true ,message:"Not Authenticated"});
    }
    res.status(200).json({success:true ,data:{userId : req.session.userId , role:req.session.role}})
}