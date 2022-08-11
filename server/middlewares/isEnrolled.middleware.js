const { Unauthorized } = require("../errors");
const Course = require("../models/course");
const User = require("../models/user");

const isEnrolledMiddleware = async (req, res, next) => {
  const { slug } = req.params;

  const user = await User.findById(req.user.userId).exec();
  const course = await Course.findOne({ slug }).exec();

  //check if course id is in user courses array
  let ids = [];
  const length = user.courses && user.courses.length;

  for (let i = 0; i < length; i++) {
    ids.push(user.courses[i].toString());
  }

  if (course && !ids.includes(course._id.toString())) {
    throw new Unauthorized("Unauthorized");
  }

  next();
};

module.exports = isEnrolledMiddleware;
