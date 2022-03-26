import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
require("dotenv").config();

// Register controller
export const register = async (req, res) => {
  try {
    // destructuring req.body
    const { name, email, password } = req.body;

    // checking if name field is empty
    if (!name) return res.status(400).send("Name is required");

    //checking if email field is empty
    if (!email) return res.status(400).send("Email is required");

    // checking if password field is empty
    if (!password) return res.status(400).send("Password is required");

    // checking if password length is less than 6
    if (password.length < 6)
      return res.status(400).send("Password must be at least 6 characters");

    // getting user data from database using email entered
    let userExist = await User.findOne({ email });

    // checking if user exists
    if (userExist)
      return res.status(400).send(" Email belongs to another user");

    // hashing password before saving
    const hashedPassword = await hashPassword(password);

    // creating a new user instance using user schema/ user model
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    //save new user in db
    await user.save();

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error Try again");
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    //destructuring req.body
    const { email, password } = req.body;

    // checking if email field is empty
    if (!email) return res.status(400).send("Please enter email address");

    // checking if password field is empty
    if (!password) return res.status(400).send("Please enter password");

    // checking if password length is less than 6
    if (password.length < 6)
      return res.status(400).send("Password must be at least 6 characters");

    // getting user from db with entered email
    const user = await User.findOne({ email });

    // checking if user exist
    if (!user) return res.status(400).send("No User Found!!");

    // comparing entered password with hashed password in db
    const match = await comparePassword(password, user.password);

    //checking if password matched
    if (match) {
      //create signed jwt
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // return user and token to client, excluding password
      user.password = undefined;

      // send token in cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // only works on https
      });

      //send user as json
      res.json({
        user: user,
        success: true,
      });
    } else {
      return res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send(`Login Failed: ${err.response}`);
  }
};
