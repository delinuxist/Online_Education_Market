const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");
const Course = require("../models/course");

exports.currentInstructor = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password").exec();

  if (!user.role.includes("Instructor")) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "Not Authorized",
    });
  }
  res.status(StatusCodes.OK).json({ success: true });
};

exports.instructorCourses = async (req, res) => {
  const courses = await Course.find({ instructor: req.user.userId })
    .sort({
      createdAt: -1,
    })
    .exec();

  res.status(StatusCodes.OK).json({
    count: courses.length,
    courses,
  });
};

exports.course = async (req, res) => {
  const { slug } = req.params;

  const course = await Course.findOne({
    instructor: req.user.userId,
    slug,
  })
    .populate("instructor", "_id name")
    .exec();

  res.status(StatusCodes.OK).json({
    course,
  });
};

// enrolled students
exports.enrolledStudents = async (req, res) => {
  const { courseId } = req.body;

  // console.log(courseId);

  const enrolledStudents = await User.find({ courses: courseId })
    .select("_id")
    .exec();

  // console.log(enrolledStudents);

  res.status(StatusCodes.OK).json({
    enrolledStudents,
  });
};
