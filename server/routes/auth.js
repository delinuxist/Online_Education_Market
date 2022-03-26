import express from "express";

const router = express.Router();

//controllers
import { register, login } from "../controllers/auth";

//register router
router.post("/register", register);

// login router
router.post("/login", login);

module.exports = router;
