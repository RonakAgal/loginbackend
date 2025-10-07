import { Router } from "express";
<<<<<<< HEAD
import {
  loginUser,
  logoutUser,
  registerUser,
  getProfile,
  getAllUsers
 
} from "../../controllers/user/user.controller.js";
=======
import { loginUser, logoutUser, registerUser,getProfile,getAllUsers} from "../../controllers/user/user.controller.js";
>>>>>>> d8ff6969bb30147a33ad2e23af82bba4c85c5d4b
import validateRequest from "../../middlewares/Validation.middleware.js";
import {
  loginSchema,
  registerUserValidation,
} from "../../validations/user.validations.js";

const router = Router();

router.post("/register", validateRequest(registerUserValidation), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", logoutUser);

<<<<<<< HEAD
router.get("/profile", getProfile);
router.get("/all", getAllUsers);

=======

router.get('/profile',getProfile)
router.get("/all", getAllUsers);


>>>>>>> d8ff6969bb30147a33ad2e23af82bba4c85c5d4b
export default router;
