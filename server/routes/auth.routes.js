const express = require("express");

const router = express.Router();

//controllers
const {
  register,
  login,
  logout,
  currentUser,
  sendEmail,
  forgetPassword,
  resetPassword,
} = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

//register router
router.post("/register", register);

// login router
router.post("/login", login);

// logout router
router.get("/logout", logout);

// current user
router.get("/current-user", AuthMiddleware, currentUser);

// send email
// router.get("/send-email", sendEmail);

// forgot password
router.post("/forgot-password", forgetPassword);

// reset password
router.post("/reset-password", resetPassword);

module.exports = router;
