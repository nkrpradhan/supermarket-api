const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");

const userRouter = express.Router();

//LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

//REGISTER

userRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      username,
      password,
    });

    if (user) {
      res.status(201).json({ message: "User created" });
    } else {
      res.status(400);
      throw new Error("Invalid Info Provided");
    }
  })
);

//PROFILE
userRouter.get(
  "/:username/profile",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const [user] = await User.find({ username });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//UPDATE PROFILE
userRouter.put(
  "/:username/profile",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const [user] = await User.find({ username });

    if (user) {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

module.exports = userRouter;
