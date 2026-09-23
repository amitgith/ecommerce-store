import { Router } from "express";
import {
  loginApiController,
  refreshTokenApiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator.js";
const router = Router();
// Create a new user account
router.post("/register", registerValidator, registerApiController);
router.post("/login", loginValidator, loginApiController);
router.post("/refresh-token", refreshTokenApiController);
export default router;
