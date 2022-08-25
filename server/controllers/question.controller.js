const { StatusCodes } = require("http-status-codes");
const Course = require("../models/course");
const Question = require("../models/question");

exports.addQuestions = async (req, res) => {
  const { lessonId } = req.params;

  const emptyQuestion = await Question.updateOne(
    { lessonId },
    {
      $addToSet: {
        questions: {},
      },
    }
  );

  res.status(StatusCodes.OK).json({
    status: "success",
  });
};

exports.addAnswers = async (req, res) => {
  const { lessonId, questionId } = req.params;
  console.log(lessonId, questionId);
  const { answerSection, questionText } = req.body;
  console.log(req.body);

  const question = await Question.findOne({ lessonId });

  if (question) {
    const updateAnswers = await Question.updateOne(
      {
        "questions._id": questionId,
      },
      {
        $set: {
          "questions.$.questionText": questionText,
        },
        $addToSet: {
          "questions.$.answerOptions": answerSection,
        },
      }
    );
  } else {
    const question = await Question.create({
      Instructor: req.user.userId,
      lessonId,
      questions: {
        questionText,
        answerOptions: answerSection,
      },
    });
  }
  res.status(StatusCodes.CREATED).json({ status: "created" });
};

exports.getQuestion = async (req, res) => {
  const { lessonId } = req.params;
  console.log(lessonId);
  // console.log(lessonId);

  const question = await Question.findOne({ lessonId: lessonId }).exec();

  if (question) {
    return res.status(StatusCodes.OK).json({
      status: "success",
      question,
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: "failed",
    });
  }
};

exports.doneAdding = async (req, res) => {
  const { lessonId } = req.params;
  console.log(lessonId);

  // const question = await Question.findOneAndUpdate(
  //   { lessonId: lessonId },
  //   {
  //     done: true,
  //   },
  //   { new: true }
  // );

  const updateCourse = await Course.findOneAndUpdate(
    { "lessons._id": lessonId },
    {
      $set: {
        "lessons.$.testAdded": true,
      },
    },
    { new: true }
  ).exec();

  res.status(StatusCodes.OK).json({
    status: "success",
  });
};

exports.completedTest = async (req, res) => {
  const { lessonId } = req.params;
  const { score } = req.body;

  const question = await Question.findOneAndUpdate(
    { lessonId: lessonId },
    {
      completedTest: true,
      score: score,
    },
    { new: true }
  );

  if (question) {
    res.status(StatusCodes.OK).json({
      status: "success",
    });
  }
};

exports.retakeTest = async (req, res) => {
  const { lessonId } = req.params;

  const question = await Question.findOneAndUpdate(
    { lessonId: lessonId },
    {
      completedTest: false,
      score: 0,
    },
    { new: true }
  );

  if (question) {
    res.status(StatusCodes.OK).json({
      status: "success",
    });
  }
};
