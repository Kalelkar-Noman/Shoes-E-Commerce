import { Router } from "express";
import { registerUser, loginUser,updateAccountDetails } from "../controllers/user.controller.js";
const router = Router();
// user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update-account-details").patch(updateAccountDetails);
export default router;
