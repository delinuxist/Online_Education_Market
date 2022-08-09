require("dotenv").config();
const AWS = require("aws-sdk");

const awsConfig = {
  accessKeyId: process.env.AWS_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);
const S3 = new AWS.S3(awsConfig);

module.exports = { SES, S3 };
