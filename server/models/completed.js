const mongoose = require("mongoose");

const { Schema } = mongoose;

const completedSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    lessons: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("completed", completedSchema);
