const express = require("express");

const router = express.Router();

//controllers
const { register, login, logout } = require("../controllers/auth.controller");

//register router
router.post("/register", register);

// login router
router.post("/login", login);

// logout router
router.get("/logout", logout);

module.exports = router;
