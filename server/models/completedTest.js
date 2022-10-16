const mongoose = require("mongoose");

const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    lessonId: {
      type: mongoose.Types.ObjectId,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    score: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const completedTestSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("completedTest", completedTestSchema);
