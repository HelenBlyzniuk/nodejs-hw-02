import express from "express";

import userControllers from '../../controllers/users-controllers.js';

import {authenticate} from '../../middlewares/authenticate.js';
import { upload } from "../../middlewares/upload.js";

const authRouter=express.Router()

authRouter.post("/register",userControllers.signup);

authRouter.post("/login",userControllers.login);

authRouter.post('/logout',authenticate,userControllers.logout);

authRouter.get('/current',authenticate, userControllers.getCurrent);

authRouter.patch('/avatars',authenticate,upload.single("avatarURL"),userControllers.updateAvatar)

export default authRouter;