import { Router } from "express";
import * as controller from "./user.controller";

const UserRouter = Router();

UserRouter.route("/signup").post(controller.createUser);

export default UserRouter;
