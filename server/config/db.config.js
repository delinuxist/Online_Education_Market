const mongoose = require("mongoose");

const connectDb = (dbUri) => {
  return mongoose.connect(dbUri);
};

module.exports = connectDb;
