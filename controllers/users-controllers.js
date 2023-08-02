import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import "dotenv/config";

import User from "../models/users.js";
import { HttpError } from "../helpers/index.js";
import { validateBody } from "../decorators/validateBody.js";

import ctrlWrapper from "../decorators/contacts-decorator.js";
import { userSignupSchema } from "../Schema/userSchema.js";



const{JWT_SECRET}=process.env;
const signup=async(req,res)=>{
    validateBody(userSignupSchema);
    const {password}=req.body;
    const hashPassword=await bcrypt.hash(password,10)
    const {email}=req.body;
    const user=await User.findOne({email})
    if(user){
        throw HttpError(409, "Email in use")
    }

    
    const newUser=await User.create({...req.body,password:hashPassword});
    res.status(201).json({
    email:newUser.email,
    subscription:newUser.subscription
    })
}



const login=async(req,res)=>{
    validateBody(userSignupSchema);
    const{email,password}=req.body; 
    const user=await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password is wrong")
    }
    const passwordCompare =  bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

  
    const token=jwt.sign(payload,JWT_SECRET,{expiresIn:"23h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
    })
}


const logout=async(req,res)=>{
    const {_id}=req.user;
    await User.findByIdAndUpdate(_id,{token:''});
    res.status(204).json({
        message:'Logout success'
    })
}


const getCurrent=async(req,res)=>{
    const{email}=req.user;
    res.status(200).json({
        email,
        subscription,
    })
}
export default{
    signup:ctrlWrapper(signup),
    login:ctrlWrapper(login),
    logout:ctrlWrapper(logout),
    getCurrent:ctrlWrapper(getCurrent),
}