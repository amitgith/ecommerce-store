import { body, validationResult } from "express-validator";
export const createProductValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Title length must be between 2 to 100 characters")
    .bail()
    .matches(/^[A-Za-z0-9\s'&-]+$/)
    .withMessage(
      "Title can only contain English letters, numbers, spaces, hyphen, apostrophe and &.",
    ),
  body("description")
    .exists()
    .withMessage("Description is required")
    .bail()
    .isString()
    .withMessage("Description must be a string")
    .bail()
    .trim()
    .isLength({ min: 20, max: 500 })
    .withMessage("Description length must be between 20 to 500 characters")
    .bail()
    .matches(/^[A-Za-z0-9\s.,'&()%-]+$/)
    .withMessage(
      "Description can only contain English letters, spaces, hyphen, apostrophe and &.",
    )
    .bail(),
  body("price")
    .exists()
    .withMessage("Price is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];
