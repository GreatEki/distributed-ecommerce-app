import { Router } from "express";
import * as controller from "./wallet.controller";
const router = Router();

router.route("/user/:userId").get(controller.getUserWallet);

router.route("/top-up/").post(controller.topUpWallet);

export default router;
