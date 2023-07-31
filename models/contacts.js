

import{Schema,model}from 'mongoose';
import { handleSaveError, handleUpdate } from '../hooks/hooks.js';

const contactSchema=new Schema({
  name:{
    type:String,
    required:true,
  },
  favorite:{
    type:Boolean,
    default:false,
  },
  email:{
    type:String,
    match:/.+\@.+\..+/,
  },
  phone:{
    type:String,
    match:/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  }
},{versionKey:false,timestamps:true});

contactSchema.pre('findOneAndUpdate',handleUpdate);

contactSchema.post('save',handleSaveError);

contactSchema.post("findOneAndUpdate",handleSaveError);

const Contact=model('contact',contactSchema);
export default Contact;