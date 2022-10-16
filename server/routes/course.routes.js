const express = require("express");
const formidable = require("express-formidable");
const {
  uploadImage,
  removeImage,
  createCourse,
  uploadVideo,
  removeVideo,
  createLesson,
  updateCourse,
  deleteLesson,
  updateLesson,
  publish,
  unpublish,
  getPublishedCourses,
  setUpcoming,
  getUpcomingCourses,
  singleCourse,
  checkEnroll,
  freeEnroll,
  paidEnroll,
  deleteCourse,
} = require("../controllers/course.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const InstructorMiddleware = require("../middlewares/instructor.middleware");

const router = express.Router();

router.post("/course/upload-image", uploadImage);
router.post("/course/remove-image", removeImage);
router.post("/course", AuthMiddleware, InstructorMiddleware, createCourse);
router.post(
  "/course/upload-video/:instructorId",
  AuthMiddleware,
  formidable(),
  uploadVideo
);
router.post("/course/remove-video/:instructorId", AuthMiddleware, removeVideo);
router.post("/course/lesson/:slug/:instructorId", AuthMiddleware, createLesson);
router.put("/course/:slug", AuthMiddleware, updateCourse);
router.put(
  "/course/delete-lesson/:slug/:lessonId",
  AuthMiddleware,
  deleteLesson
);
router.put(
  "/course/update-lesson/:slug/:lessonId",
  AuthMiddleware,
  updateLesson
);

// Publishing course
router.put("/course/publish/:courseId", AuthMiddleware, publish);
router.put("/course/unpublish/:courseId", AuthMiddleware, unpublish);

// get published courses
router.get("/course/published-courses", getPublishedCourses);

// get upcoming course
router.get("/course/upcoming-courses", getUpcomingCourses);

// set course upcoming
// router.put("/course/upcoming/:courseId", AuthMiddleware, setUpcoming);

// get single course
router.get("/course/single-course/:slug", singleCourse);

// check if user is enrolled in a course
router.get("/course/check-enroll/:courseId", AuthMiddleware, checkEnroll);

// free Enroll
router.post("/course/free-enroll/:courseId", AuthMiddleware, freeEnroll);

// delete Course
router.delete("/course/delete-course/:courseId", AuthMiddleware, deleteCourse);

// praid Enroll
router.post("/course/paid-enroll/:courseId", AuthMiddleware, paidEnroll);

module.exports = router;
