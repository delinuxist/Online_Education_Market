const { StatusCodes } = require("http-status-codes");
const Course = require("../models/course");
const User = require("../models/user");
const Completed = require("../models/completed");

exports.userCourses = async (req, res) => {
  const user = await User.findById(req.user.userId).exec();

  const courses = await Course.find({ _id: { $in: user.courses } })
    .populate("instructor", "_id name")
    .exec();

  res.status(StatusCodes.OK).json({
    count: courses.length,
    courses,
  });
};

exports.singleCourse = async (req, res) => {
  const { slug } = req.params;

  const course = await Course.findOne({ slug }).exec();

  res.status(StatusCodes.OK).json({
    course,
  });
};

// mark Lessons completed
exports.markCompleted = async (req, res) => {
  const { courseId, lessonId } = req.body;

  const existing = await Completed.findOne({
    user: req.user.userId,
    course: courseId,
  }).exec();

  if (existing) {
    //update
    const updated = await Completed.findOneAndUpdate(
      { user: req.user.userId, course: courseId },
      {
        $addToSet: {
          lessons: lessonId,
        },
      }
    ).exec();
    res.status(StatusCodes.OK).json({ success: true });
  } else {
    //create
    const created = await new Completed({
      user: req.user.userId,
      course: courseId,
      lessons: lessonId,
    }).save();

    res.status(StatusCodes.CREATED).json({
      success: true,
    });
  }
};

exports.markIncomplete = async (req, res) => {
  const { courseId, lessonId } = req.body;

  const updated = await Completed.findOneAndUpdate(
    { user: req.user.userId, course: courseId },
    {
      $pull: {
        lessons: lessonId,
      },
    },
    { new: true }
  );

  updated &&
    res.status(StatusCodes.OK).json({
      update: updated.lessons,
    });
};

// get completed lessons
exports.completedLessons = async (req, res) => {
  const { courseId } = req.body;

  const completedLesson = await Completed.findOne({
    user: req.user.userId,
    course: courseId,
  }).exec();

  completedLesson &&
    res.status(StatusCodes.OK).json({
      completedLessons: completedLesson.lessons,
    });
};
