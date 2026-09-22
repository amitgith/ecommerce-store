import { Router } from "express";
import { apiController } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", apiController);
export default router;
