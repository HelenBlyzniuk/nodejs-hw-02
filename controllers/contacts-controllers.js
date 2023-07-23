import contactsService from "../models/contacts.js";
import { HttpError } from "../helpers/index.js";
import { validateBody } from "../decorators/validateBody.js";

import ctrlWrapper from "../decorators/contacts-decorator.js";
import {contactAddSchema} from "../Schema/contactSchema.js"

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} does not exist`);
  }
  res.json(result);
};

const add = async (req, res) => {
  validateBody(contactAddSchema);
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
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
  const result = await contactsService.updateContact(contactId, req.body);
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
};
