import express from "express";

import userControllers from '../../controllers/users-controllers.js';


const authRouter=express.Router()

authRouter.post("/register",userControllers.signup);

authRouter.post("/login",userControllers.login);
export default authRouter;