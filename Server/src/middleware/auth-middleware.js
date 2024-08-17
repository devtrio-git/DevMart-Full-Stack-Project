import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.schema.js';
import Constants from '../constant.js';

const authMiddleware = async (req,res,next) => {
    const token = req.headers.authorization?.split(" ")?.[1];
    console.log(token, "<--token")
    if(!token) {
        return res.status(401).json({message: 'User Unauthorized', status: 'failed'});
    }
    try {
        const decode = jwt.verify(token, Constants.JWT_SECRET)
        console.log(decode, "<-- decode")
        const user = await userModel.findById(decode?.user?.id);
        if(!user){
            return res.status(404).json({message: "User not Found", status: 'failed'});
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: "token is not valid"})
    }
}

const checkAdminMiddleware = async (req,res,next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "Access denied, admin only", status: 'failed'});
    }
    next();
}


export {authMiddleware, checkAdminMiddleware}