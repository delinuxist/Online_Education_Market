const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");
const { SES } = require("../config/aws.config");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Register controller
exports.register = async (req, res) => {
  // destructuring req.body
  const { name, email, password } = req.body;

  // checking if name field is empty
  if (!name) {
    throw new BadRequest("Name is required");
  }

  //checking if email field is empty
  if (!email) {
    throw new BadRequest("Email is required");
  }

  // checking if password field is empty
  if (!password) {
    throw new BadRequest("Password is required");
  }

  // checking if password length is less than 6
  if (password.length < 6) {
    throw new BadRequest("Password must be at least 6 characters");
  }

  // create user
  await User.create(req.body);

  // SES.verifyEmailAddress()

  return res.status(StatusCodes.CREATED).json({ success: true });
};

// Login Controller
exports.login = async (req, res) => {
  //destructuring req.body
  const { email, password } = req.body;

  // checking if email field is empty
  if (!email) {
    throw new BadRequest("Email is required");
  }

  // checking if password field is empty
  if (!password) {
    throw new BadRequest("Password is required");
  }

  // checking if password length is less than 6
  if (password.length < 6) {
    throw new BadRequest("Password must be at least 6 characters");
  }

  // getting user from db with entered email
  const user = await User.findOne({ email });

  // checking if user exist
  if (!user) {
    throw new BadRequest("No User Found!!");
  }

  // comparing entered password with hashed password in db
  const isMatch = await user.comparePassword(password);

  //checking if password matched
  if (!isMatch) {
    throw new BadRequest("Invalid Credentials");
  }

  //create signed jwt
  const token = user.generateToken(process.env.JWT_SECRET);

  // return user and token to client, excluding password
  user.password = undefined;

  // send token in cookies
  res.cookie("token", token, {
    httpOnly: true,
    //secure: true, // only works on https
  });

  //send user as json
  return res.json({
    user: user,
    success: true,
  });
};

// Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("token");
  return res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "SignOut Success" });
};

// Current User controller
exports.currentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password").exec();

  res.status(StatusCodes.OK).json({
    authenticated: true,
  });
};

// Send Email controller
// exports.sendEmail = async (req, res) => {
//   // res.status(StatusCodes.OK).json({
//   //   active: true,
//   // });
//   const params = {
//     Source: process.env.EMAIL_FROM,
//     Destination: {
//       ToAddresses: ["obeng468@gmail.com"],
//     },
//     ReplyToAddresses: [process.env.EMAIL_FROM],
//     Message: {
//       Body: {
//         Html: {
//           Charset: "UTF-8",
//           Data: `
//             <html>
//               <h1>Reset password link</h1>
//               <p>Please use the link below to reset your password</p>
//             </html>
//           `,
//         },
//       },
//       Subject: {
//         Charset: "UTF-8",
//         Data: "KLearn Password reset Link",
//       },
//     },
//   };

//   const emailSent = SES.sendEmail(params).promise();

//   emailSent
//     .then((data) => {
//       console.log(data);
//       res.json({
//         ok: true,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// forget-password controller
exports.forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  const shortCode = Math.floor(1000 + Math.random() * 9000);

  const user = await User.findOneAndUpdate(
    { email },
    { passwordReset: shortCode }
  );

  if (!user) {
    throw new BadRequest("User not found");
  }

  // send mail
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <html>
              <h1>Reset password link</h1>
              <p>Please use the code below to reset your password</p>
              <h2 style="color:red">${shortCode}</h2>
              <i>KLearn.com</i>
            </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "KLearn Password reset Link",
      },
    },
  };

  const emailSent = SES.sendEmail(params).promise();

  emailSent
    .then((data) => {
      console.log(data);
      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

// reset Password controller
exports.resetPassword = async (req, res) => {
  const { code, email, newPassword } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  const user = await User.findOneAndUpdate(
    { email, passwordReset: code },
    { password: hashedPassword, passwordReset: "" }
  ).exec();

  console.log(user);

  if (!user) {
    throw new BadRequest("Unauthorized");
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
  });
};
