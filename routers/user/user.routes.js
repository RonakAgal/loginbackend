import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
  getAllUsers
 
} from "../../controllers/user/user.controller.js";
import validateRequest from "../../middlewares/Validation.middleware.js";
import {
  loginSchema,
  registerUserValidation,
} from "../../validations/user.validations.js";

const router = Router();

router.post("/register", validateRequest(registerUserValidation), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", logoutUser);

router.get("/profile", getProfile);
router.get("/all", getAllUsers);

export default router;
