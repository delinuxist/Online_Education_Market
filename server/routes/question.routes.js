const express = require("express");
const {
  addQuestions,
  addAnswers,
  getQuestion,
  doneAdding,
  completedTest,
  retakeTest,
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

router.post("/question/completedTest/:lessonId", completedTest);

router.get("/question/retakeTest/:lessonId", retakeTest);

module.exports = router;
