import Router from "express";
import {
  fullNameValidator,
  usernameValidator,
  emailValidator,
  passwordValidator,
} from "../utils/validators/user.validator.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  renewAccessToken,
  getUser,
  editUser
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middelware.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  //Avatar upload
  upload.single("avatar"),
  //validators
  fullNameValidator(),
  usernameValidator(),
  emailValidator(),
  passwordValidator("password"),
  //Controller
  registerUser
);

router.post(
  "/login",
  upload.none(),
  usernameValidator(),
  passwordValidator("password"),
  loginUser
);

router.post("/logout", verifyJWT, logoutUser);

router.post(
  "/reset-password",
  upload.none(),
  verifyJWT,
  passwordValidator("newPassword"),
  passwordValidator("oldPassword"),
  passwordValidator("confirmPassword"),
  resetPassword
);

router.get("/renew-token", renewAccessToken)

router.get("/:userId", getUser)

router.patch("/edit-user/:username", verifyJWT, upload.single('avatar') ,editUser )

export default router;
