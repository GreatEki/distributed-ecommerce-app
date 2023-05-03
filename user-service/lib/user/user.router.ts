import { Router } from "express";
import * as controller from "./user.controller";
import { createUserValidator } from "./user.validator";

const UserRouter = Router();

UserRouter.route("/signup").post(createUserValidator, controller.createUser);

export default UserRouter;
