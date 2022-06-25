// const { expressjwt } = require("express-jwt");
const { Unauthorized } = require("../errors");
const jwt = require("jsonwebtoken");

// const AuthMiddleware = expressjwt({
//   getToken: (req, res) => req.cookies.token,
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
// });

const AuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Unauthorized("Not Authorized");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
    };
  } catch (err) {
    throw new Unauthorized("Token Expired");
  }
  next();
};

module.exports = AuthMiddleware;
