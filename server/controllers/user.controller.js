const { StatusCodes } = require("http-status-codes");
const Course = require("../models/course");
const User = require("../models/user");
const Completed = require("../models/completed");
const bcrypt = require("bcryptjs");
const { BadRequest } = require("../errors");

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

// search course by name
exports.searchCourse = async (req, res) => {
  const { search } = req.body;
  let re = new RegExp(search, "i");
  const courses = await Course.find({
    name: {
      $regex: re,
    },
    published: true,
  })
    .populate("instructor", "_id name")
    .exec();

  res.status(StatusCodes.OK).json({
    count: courses.length,
    courses,
  });
};

// delete user course
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  const removed = await User.findByIdAndUpdate(
    {
      _id: req.user.userId,
    },
    {
      $pull: {
        courses: courseId,
      },
    },
    {
      new: true,
    }
  );

  //remove course from completed model
  const completedRemoved = await Completed.findOneAndRemove({
    user: req.user.userId,
    course: courseId,
  }).exec();

  res.status(StatusCodes.OK).json({
    success: true,
  });
};

//update user Details
exports.updateUser = async (req, res) => {
  const { formName, formEmail, image } = req.body;

  const newUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      name: formName,
      email: formEmail,
      avatar: image,
    },
    { new: true }
  ).select("-password");
  console.log(newUser);

  res.status(StatusCodes.CREATED).json({
    newUser,
  });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user.userId).exec();

  const isMatch = await user.comparePassword(oldPassword);

  //checking if password matched
  if (!isMatch) {
    throw new BadRequest("Old Password Incorrect");
  }

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(confirmPassword, salt);

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      password: hashedPassword,
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    success: true,
  });
};

// add discussions
exports.addDiscussions = async (req, res) => {
  const { comment, lessonId, index } = req.body;

  const updateDiscussion = await Course.findOneAndUpdate(
    {
      "lessons._id": lessonId,
    },
    {
      $addToSet: {
        "lessons.$.discussions": comment,
      },
    },
    {
      new: true,
    }
  );
  const updatedDiscussion = updateDiscussion.lessons[index].discussions;

  res.status(StatusCodes.OK).json({
    updatedDiscussion,
    success: true,
  });
};

// remove discussion
exports.removeDiscussion = async (req, res) => {
  const { lessonId, discussionId } = req.body;

  const updateCourse = await Course.updateOne(
    { "lessons._id": lessonId },
    {
      $pull: {
        "lessons.$.discussions": discussionId,
      },
    }
  );

  res.status(StatusCodes.OK).json({
    success: true,
  });
};
