const { StatusCodes } = require("http-status-codes");
const CustomErrorApi = require("./customErrorApi");

class BadRequest extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
