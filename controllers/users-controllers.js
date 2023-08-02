import User from "../models/users.js";
import { HttpError } from "../helpers/index.js";
import { validateBody } from "../decorators/validateBody.js";

import ctrlWrapper from "../decorators/contacts-decorator.js";
import { userSignupSchema } from "../Schema/userSchema";




const signup=async(req,res)=>{
    validateBody(userSignupSchema);
    const {email}=req.body;
    const user=await User.findOne({email})
    if(user){
        throw HttpError(409, "Email in use")
    }

    
    const newUser=await User.create(req.body);
    res.status(201).json({
    email:newUser.email,
    subscription:newUser.subscription
    })
}

export default{
    signup:ctrlWrapper(signup),
}