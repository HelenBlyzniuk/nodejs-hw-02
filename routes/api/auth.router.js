import express from "express";

import userControllers from '../../controllers/users-controllers.js';


const authRouter=express.Router()

authRouter.post("/signup",userControllers.signup )
export default authRouter;