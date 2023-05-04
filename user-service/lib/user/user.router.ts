import { Router } from "express";
import * as controller from "./user.controller";
import { createUserValidator } from "./user.validator";

const UserRouter = Router();

UserRouter.route("/signup").post(createUserValidator, controller.createUser);

UserRouter.route("/signin").post(controller.signIn); 

UserRouter.route("/:userId").get(controller.getUser);

export default UserRouter;
