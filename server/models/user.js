const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      match: [
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 30,
    },
    avatar: {},
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    role: {
      type: [String],
      default: ["Subscriber"],
      enum: ["Subscriber", "Instructor", "Admin"],
    },
    flw_subAccount: {},
    passwordReset: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

// hash password before saving
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password method
userSchema.method("comparePassword", async function (password) {
  return bcrypt.compare(password, this.password);
});

userSchema.method("generateToken", function (jwtScret) {
  return jwt.sign({ userId: this._id }, jwtScret, {
    expiresIn: "7d",
  });
});

module.exports = mongoose.model("User", userSchema);
