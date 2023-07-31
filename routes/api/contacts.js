import express from "express";

import contactsController from "../../controllers/contacts-controllers.js";
import { isValidId } from "../../middlewares/isValidId.js";

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId,contactsController.getById);

router.post("/", contactsController.add);

router.delete("/:contactId",isValidId, contactsController.deleteById);

router.put("/:contactId", isValidId,contactsController.update);

router.patch("/:contactId/favorite",isValidId, contactsController.updateFavorite);

export default router;
