const { StatusCodes } = require("http-status-codes");
const CompletedTest = require("../models/completedTest");
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
  const { lessonId, courseId } = req.params;
  const { score } = req.body;

  const isExisting = await CompletedTest.findOne({
    user: req.user.userId,
    course: courseId,
  });

  if (isExisting) {
    const isIn = await CompletedTest.findOne({
      "lessons.lessonId": lessonId,
    });

    if (isIn) {
      //update
      const update = await CompletedTest.updateOne(
        {
          "lessons.lessonId": lessonId,
        },
        {
          $set: {
            "lessons.$.score": score,
            "lessons.$.completed": true,
          },
        },
        { new: true }
      ).exec();
      res.status(StatusCodes.OK).json({
        success: true,
      });
    } else {
      const update = await CompletedTest.findOneAndUpdate(
        {
          user: req.user.userId,
          course: courseId,
        },
        {
          $push: {
            lessons: {
              lessonId: lessonId,
              completed: true,
              score: score,
              note: "",
            },
          },
        }
      );

      res.status(StatusCodes.CREATED).json({
        success: true,
      });
    }
  } else {
    //create
    const created = await new CompletedTest({
      user: req.user.userId,
      course: courseId,
      lessons: {
        lessonId: lessonId,
        completed: true,
        score: score,
        note: "",
      },
    }).save();

    res.status(StatusCodes.CREATED).json({
      success: true,
    });
  }
};

// get completed tests
exports.getCompletedTest = async (req, res) => {
  const { courseId } = req.body;

  const completedTests = await CompletedTest.findOne({
    user: req.user.userId,
    course: courseId,
  });

  if (completedTests) {
    res.status(StatusCodes.OK).json({
      completedTests: completedTests?.lessons,
    });
  }
};

// Retake Test method
exports.retakeTest = async (req, res) => {
  const { lessonId } = req.params;

  const question = await CompletedTest.updateOne(
    {
      "lessons.lessonId": lessonId,
    },
    {
      $set: {
        "lessons.$.score": 0,
        "lessons.$.completed": false,
      },
    },
    { new: true }
  );

  if (question) {
    res.status(StatusCodes.OK).json({
      status: "success",
    });
  }
};

// save Note
exports.saveNote = async (req, res) => {
  const { lessonId, courseId } = req.params;
  const { note } = req.body;

  const isExisting = await CompletedTest.findOne({
    user: req.user.userId,
    course: courseId,
  });

  if (isExisting) {
    const isIn = await CompletedTest.findOne({
      "lessons.lessonId": lessonId,
    });

    if (isIn) {
      //update
      const update = await CompletedTest.updateOne(
        {
          "lessons.lessonId": lessonId,
        },
        {
          $set: {
            "lessons.$.note": note,
          },
        },
        { new: true }
      ).exec();
      res.status(StatusCodes.OK).json({
        success: true,
      });
    } else {
      const update = await CompletedTest.findOneAndUpdate(
        {
          user: req.user.userId,
          course: courseId,
        },
        {
          $push: {
            lessons: {
              lessonId: lessonId,
              completed: false,
              score: 0,
              note: note,
            },
          },
        }
      );

      res.status(StatusCodes.CREATED).json({
        success: true,
      });
    }
  } else {
    //create
    const created = await new CompletedTest({
      user: req.user.userId,
      course: courseId,
      lessons: {
        lessonId: lessonId,
        completed: false,
        score: 0,
        note: note,
      },
    }).save();

    res.status(StatusCodes.CREATED).json({
      success: true,
    });
  }
};
