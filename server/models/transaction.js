const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    amount: {
      type: Number,
      default: 0.0,
    },
    tx_ref: { type: String, lowercase: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);
