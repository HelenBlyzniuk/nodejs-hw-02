import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import User from "../models/users.js";
import { HttpError } from "../helpers/index.js";
import { validateBody } from "../decorators/validateBody.js";

import ctrlWrapper from "../decorators/contacts-decorator.js";
import { userSignupSchema } from "../Schema/userSchema.js";

// const {JWT_SECRET} = process.env;
// console.log(JWT_SECRET)

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
    const user=await User.findOne({email})
    if(user){
        throw HttpError(401, "Email or password is wrong")
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong")
        
    }
}
export default{
    signup:ctrlWrapper(signup),
    login:ctrlWrapper(login),
}