const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let customErr = {
    msg: err.message || "Something went wrong try agian",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  // Duplicate email error handler
  if (err.code && err.code === 11000) {
    (customErr.statusCode = StatusCodes.BAD_REQUEST),
      (customErr.msg = `Duplicate emails please try again...`);
  }

  // Message not sent aws error handler
  if (err.code && err.code === "MessageRejected") {
    customErr.msg = "Email Address not verified...";
  }

  res.status(customErr.statusCode).json({
    status: "error",
    msg: customErr.msg,
  });
};

module.exports = errorHandler;
