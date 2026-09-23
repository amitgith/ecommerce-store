import { body, validationResult } from "express-validator";
export const registerValidator = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be string")
    .bail()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Name length must be between 3 to 20 characters"),
  body("email")
    .exists()
    .withMessage("Emai is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid Email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be a miniumum 8 characters long"),
  body("confirmPassword")
    .exists()
    .withMessage("Confirm Password is required")
    .bail()
    .isString()
    .withMessage("Confirm Password must be as string")
    .bail()
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];
export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be a miniumum 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];
