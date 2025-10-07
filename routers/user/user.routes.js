import { Router } from "express";
import { loginUser, logoutUser, registerUser,updateProfile,deleteProfile,getProfile,isLoggedIn } from "../../controllers/user/user.controller.js";
import validateRequest from "../../middlewares/Validation.middleware.js";
import { loginSchema, registerUserValidation } from "../../validations/user.validations.js";




const router = Router();

router.post('/register', validateRequest(registerUserValidation), registerUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.post('/logout', logoutUser);

router.patch('/profile', updateProfile)
router.delete('/profile', deleteProfile)
router.get('/profile',getProfile)

router.get('/isLoggedIn',isLoggedIn)

export default router;