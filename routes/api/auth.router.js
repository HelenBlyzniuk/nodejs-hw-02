import express from "express";

import userControllers from '../../controllers/users-controllers.js';

import {authenticate} from '../../middlewares/authenticate.js';

const authRouter=express.Router()

authRouter.post("/register",userControllers.signup);

authRouter.post("/login",userControllers.login);

authRouter.post('/logout',authenticate,userControllers.logout);

authRouter.get('/current',authenticate, userControllers.getCurrent);

export default authRouter;