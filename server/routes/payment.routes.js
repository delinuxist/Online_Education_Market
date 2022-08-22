const express = require("express");
const {
  createSubAccount,
  fetchSubAccount,
  fetchBanks,
  makePayment,
  verifyPayment,
  verifyCallback,
} = require("../controllers/payment.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/payment/fetch_Banks", fetchBanks);

router.post("/payment/create_SubAccount", AuthMiddleware, createSubAccount);

router.get("/payment/fetch_SubAccount", fetchSubAccount);

router.get("/payment/make_Payment/:slug", AuthMiddleware, makePayment);

router.post("/payment/verify_Callback", verifyCallback);

router.post("/payment/verify_Payment", verifyPayment);

module.exports = router;
