import Joi from "joi";

export const userSignupSchema=Joi.object({
    password:Joi.string().min(6).required(),
    email:Joi.string().pattern(/.+\@.+\..+/).required(),

});

