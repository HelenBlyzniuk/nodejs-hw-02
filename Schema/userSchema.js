import Joi from "joi";

export const userSignupSchema=Joi.object({
    password:Joi.string().min(6).required(),
    email:Joi.string().pattern(/.+\@.+\..+/).required(),

});

export const userEmailVerificationSchema=Joi.object({
    email:Joi.string().pattern(/.+\@.+\..+/).required(),

});
