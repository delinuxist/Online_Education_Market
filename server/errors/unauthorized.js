const { StatusCodes } = require("http-status-codes");
const CustomErrorApi = require("./customErrorApi");

class Unauthorized extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
