const mongoose = require("mongoose");

const { Schema } = mongoose;

const answerSchema = new Schema({
  questionText: {
    type: String,
  },
  answerOptions: [
    {
      answerText: {
        type: String,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const questionSchema = new Schema(
  {
    Instructor: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    lessonId: {
      type: mongoose.Types.ObjectId,
    },
    questions: [answerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);
