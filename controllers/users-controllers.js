import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import fs from 'fs/promises';
import path from 'path';
import gravatar from 'gravatar';
import Jimp from 'jimp';

import User from "../models/users.js";
import { HttpError } from "../helpers/index.js";
import { validateBody } from "../decorators/validateBody.js";

import ctrlWrapper from "../decorators/contacts-decorator.js";
import { userSignupSchema } from "../Schema/userSchema.js";



const{JWT_SECRET}=process.env;
const avatarPath=path.resolve("public", "avatars");

const signup=async(req,res)=>{
    validateBody(userSignupSchema);
    const {password,email}=req.body;
    // const{path:oldPath,filename}=req.file;
    // const newPath=path.join(avatarPath,filename);

    const hashPassword=await bcrypt.hash(password,10)
    const avatarURL=gravatar.url(email);
    const user=await User.findOne({email})
    if(user){
        throw HttpError(409, "Email in use")
    }

    
    const newUser=await User.create({...req.body,password:hashPassword,avatarURL});
    res.status(201).json({
    email:newUser.email,
    subscription:newUser.subscription,
    avatarURL:newUser.avatarURL,
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


const updateAvatar=async(req,res)=>{
    const { _id } = req.user;
    if(!req.file){
        throw HttpError(400,"missing field avatar")
    }
     const{path:oldPath,filename}=req.file;
    await Jimp.read(oldPath).then((img)=>img.resize(250,250)).write(`${oldPath}`);
    const uniquePrefix=`${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileOriginalname=`${uniquePrefix}_${filename}`
    const newPath=path.join(avatarPath,fileOriginalname);
    await fs.rename(oldPath,newPath);
    const avatarURL=path.join("avatars", fileOriginalname);
    await User.findByIdAndUpdate(_id,{avatarURL});
    if (!avatarURL) throw HttpError(404, "Not found");

     res.json({ avatarURL });

}
export default{
    signup:ctrlWrapper(signup),
    login:ctrlWrapper(login),
    logout:ctrlWrapper(logout),
    getCurrent:ctrlWrapper(getCurrent),
    updateAvatar:ctrlWrapper(updateAvatar),
}