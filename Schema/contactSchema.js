import Joi from "joi";
export const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(/.+\@.+\..+/).required(),
    phone: Joi.string().pattern(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/).required(),
    favorite:Joi.boolean(),
  });


  export const contactFavoriteSchema=Joi.object({
    favorite:Joi.boolean().required(),
  })