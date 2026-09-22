import { Router } from "express";
import {
  apiController,
  registerApiController,
} from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";

const router = Router();

router.get("/", apiController);
// Create a new user account
router.post("/register", registerValidator, registerApiController);
export default router;
