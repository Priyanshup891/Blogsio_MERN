const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary");

const signup = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.file);

    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(401);
      throw new Error("User is already exists.");
    }

    const user = await User.create({
      name,
      email,
      password,
      profile_image: {
        id: result.public_id,
        url: result.secure_url,
      },
    });
    await user.save();

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const signin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("No user with this email.");
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(400);
      throw new Error("Please try again to enter your password.");
    }

    const access_token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_KEY
    );

    res
      .status(200)
      .cookie("access_token", access_token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + parseInt(process.env.JWT_COOKIE) * 1000 * 60 * 60 * 24
        ),
      })
      .json({ user, access_token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = { signup, signin };
