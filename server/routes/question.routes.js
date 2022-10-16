const express = require("express");
const {
  addQuestions,
  addAnswers,
  getQuestion,
  doneAdding,
  completedTest,
  retakeTest,
  getCompletedTest,
  saveNote,
} = require("../controllers/question.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/question/getQuestion/:lessonId", getQuestion);

router.get("/question/addQuestions/:lessonId", addQuestions);

router.get("/question/doneAdding/:lessonId", doneAdding);

router.post(
  "/question/addAnswers/:lessonId/:questionId",
  AuthMiddleware,
  addAnswers
);

// completed Test
router.post(
  "/question/completedTest/:courseId/:lessonId",
  AuthMiddleware,
  completedTest
);

// getCompleted Test
router.post("/question/getCompletedTest", AuthMiddleware, getCompletedTest);

// retake Test
router.get("/question/retakeTest/:lessonId", retakeTest);

// save Note
router.post("/question/saveNote/:courseId/:lessonId", AuthMiddleware, saveNote);

module.exports = router;
