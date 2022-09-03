const express = require("express");
const {
  currentInstructor,
  instructorCourses,
  course,
  enrolledStudents,
} = require("../controllers/instructor.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/current-instructor", AuthMiddleware, currentInstructor);
router.get("/instructor-courses", AuthMiddleware, instructorCourses);
router.get("/course/:slug", AuthMiddleware, course);
router.post("/enrolled-students", AuthMiddleware, enrolledStudents);

module.exports = router;
