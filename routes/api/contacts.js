import express from "express";
// import contactsService from '../../models/contacts.js';
// import { HttpError } from '../../helpers/index.js';
// import Joi from 'joi';

import contactsController from "../../controllers/contacts-controllers.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", contactsController.getById);

router.post("/", contactsController.add);

router.delete("/:contactId", contactsController.deleteById);

router.put("/:contactId", contactsController.update);

export default router;
