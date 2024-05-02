import { body } from "express-validator";
import {
  USERNAME_MINIMUM_LENGTH,
  FULLNAME_MINIMUM_LENGTH,
  PASSWORD_MINIMUM_LENGTH,
} from "../Constants.js";

export const fullNameValidator = () => {
  return body("fullName")
    .notEmpty()
    .withMessage("Full name cannot be empty")
    .isString()
    .isLength({ min: FULLNAME_MINIMUM_LENGTH })
    .withMessage("Full name must be atleast 4 characters long.")
    .trim();
};

export const usernameValidator = () => {
  return body("username")
    .notEmpty()
    .withMessage("Username not valid.")
    .isString()
    .isLength({ min: USERNAME_MINIMUM_LENGTH })
    .withMessage("Username must be atleast 6 characters long")
    .toLowerCase()
    .trim();
};

export const emailValidator = () => {
  return body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid Email")
    .toLowerCase()
    .trim()
    .isLength({ min: 8 });
};

export const passwordValidator = (field) => {
  return body(field, "Password cannot be empty")
    .notEmpty()
    .isLength({ min: PASSWORD_MINIMUM_LENGTH })
    .withMessage(
      `Password must be atleast ${PASSWORD_MINIMUM_LENGTH} characters long`
    )
    .trim();
};
