const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const InstructorMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.userId).select("-password").exec();

  if (!user.role.includes("Instructor")) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  next();
};

module.exports = InstructorMiddleware;
