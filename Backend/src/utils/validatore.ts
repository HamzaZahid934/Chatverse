import { body, ValidationChain, validationResult } from "express-validator";

//custom validation function
export const validate = (validations: ValidationChain[]) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

//login validator
export const loginValidator = [
  body("email").trim().isEmail().withMessage("email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
];

//signup validator
export const signupValidator = [
  body("name").notEmpty().withMessage("name is required"),
  //using login validator For email & password
  ...loginValidator,
];

export const chatCompletionValidator = [
  body("message").notEmpty().withMessage("message is required"),
];
