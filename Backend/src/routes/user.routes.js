import { Router } from "express";
import {
  registerUser,
  loginUser,
  updateAccountDetails,
  getuserById,
  getuserByIdWithPass
} from "../controllers/user.controller.js";
const router = Router();
// user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/getuserbyid").get(getuserById);
router.route("/getuserbyidwithpass").get(getuserByIdWithPass);
router.route("/updateaccountdetails").patch(updateAccountDetails);
export default router;
