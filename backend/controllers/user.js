const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }

    const isExistingUser = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (isExistingUser) {
      return res.status(400).json({ errorMessage: "User Already Exists" });
    }

    const userData = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await userData.save();

    const token = jwt.sign({ userId: email }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    return res.status(200).json({
      message: "Registered Successfull",
      token: token,
      userId: email,
      name: name,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }

    const userDetails = await User.findOne({ email });

    if (!userDetails) {
      return res.status(400).json({ errorMessage: "User Doesn't Exists" });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userDetails.password
    );

    if (!isPasswordMatched) {
      return res.status(400).json({ errorMessage: "Invalid credentails" });
    }

    const token = jwt.sign(
      { userId: userDetails._id },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login Successful",
      token: token,
      userId: userDetails._id,
      name: userDetails.name,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
