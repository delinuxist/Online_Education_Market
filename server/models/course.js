const mongoose = require("mongoose");
// const lessonSchema = require("./lesson");

const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const discussionSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    content: {
      type: {},
      minlength: 200,
    },
    numberOfQuestions: {
      type: Number,
      default: 0,
    },
    testAdded: {
      type: Boolean,
      default: false,
    },
    video: {},
    free_preview: {
      type: Boolean,
      default: false,
    },
    discussions: [discussionSchema],
  },
  { timestamps: true }
);

const courseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 320,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: {},
      minlength: 200,
      required: true,
    },
    price: {
      type: Number,
      default: 0.0,
    },
    image: {},
    category: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    upcoming: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    instructor: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("course", courseSchema);
