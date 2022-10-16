const express = require("express");
const {
  userCourses,
  singleCourse,
  markCompleted,
  completedLessons,
  markIncomplete,
  searchCourse,
  deleteCourse,
  updateUser,
  changePassword,
  addDiscussions,
  removeDiscussion,
} = require("../controllers/user.controller");

const AuthMiddleware = require("../middlewares/auth.middleware");
const isEnrolledMiddleware = require("../middlewares/isEnrolled.middleware");

const router = express.Router();

router.get("/user/user-courses", AuthMiddleware, userCourses);
router.get(
  "/user/single-course/:slug",
  AuthMiddleware,
  isEnrolledMiddleware,
  singleCourse
);

// mark lesson completed
router.post("/user/markLesson-completed", AuthMiddleware, markCompleted);

// mark lesson incompleted
router.post("/user/markLesson-incomplete", AuthMiddleware, markIncomplete);

//get completed lessons
router.post("/user/completed-lessons", AuthMiddleware, completedLessons);

// get searched course
router.post("/user/searchCourses", searchCourse);

// delete user course
router.get("/user/deleteCourse/:courseId", AuthMiddleware, deleteCourse);

// update user details
router.post("/user/updateUser", AuthMiddleware, updateUser);

// change password
router.post("/user/changePassword", AuthMiddleware, changePassword);

// Post Discussions
router.post("/user/addDiscussion", addDiscussions);

// delete discussion
router.post("/user/removeDiscussion", removeDiscussion);

module.exports = router;
