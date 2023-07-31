
import { HttpError } from "../helpers/index.js";
import { validateBody } from "../decorators/validateBody.js";

import ctrlWrapper from "../decorators/contacts-decorator.js";
import {contactAddSchema, contactFavoriteSchema} from "../Schema/contactSchema.js";
import Contact from "../models/contacts.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({_id:contactId});
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} does not exist`);
  }
  res.json(result);
};

const add = async (req, res) => {
  validateBody(contactAddSchema);
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} does not exist`);
  }
  res.json({
    message: "deleted successfully",
  });
};

const update = async (req, res) => {
 validateBody(contactAddSchema)
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} does not exist`);
  }
  res.json(result);
};

const updateFavorite=async (req, res) => {
  validateBody(contactFavoriteSchema)
   const { contactId } = req.params;
   const result = await Contact.findByIdAndUpdate(contactId, req.body,{new:true});
   if (!result) {
     throw HttpError(404, `Contact with id=${contactId} does not exist`);
   }
   res.json(result);
 };

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  update: ctrlWrapper(update),
  updateFavorite:ctrlWrapper(updateFavorite),
};
