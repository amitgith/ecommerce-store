import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import multer from "multer";
import { createProductValidator } from "../validators/product.validator.js";
import {
  createProduct,
  deleteProducts,
  getSingleProducts,
  listAllProducts,
  updateProducts,
} from "../controllers/product.controller.js";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 1 * 1024 * 1024, //1MB
  },
});

const router = Router();
// Create a new product
router.post(
  "/create",
  authenticate,
  upload.single("image"),
  (req, res, next) => {
    req.body?.price && (req.body.price = JSON.parse(req.body.price));
    next();
  },
  createProductValidator,
  createProduct,
);
// List all products (pagination optional)
router.get("/allProducts", listAllProducts);
// Get a single product by ID
router.get("/:id", getSingleProducts);
// Update a product
router.put("/:id", authenticate, updateProducts);
// Delete a product
router.delete("/:id", authenticate, deleteProducts);

export default router;
