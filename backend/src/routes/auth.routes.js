import { Router } from "express";
import {
  aboutMeApiController,
  loginApiController,
  logoutApiController,
  refreshTokenApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();
// Create a new user account
router.post("/register", registerValidator, registerApiController);
router.post("/login", loginValidator, loginApiController);
router.post("/refresh-token", refreshTokenApiController);
router.post("/logout", authenticate, logoutApiController);
router.get("/me", authenticate, aboutMeApiController);
export default router;
