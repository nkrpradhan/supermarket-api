import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User.Model.js";

const userRoute = express.Router();

//LOGIN
userRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

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

userRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    const userExists = await User.findOne({ email });
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
      res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Info Provided");
    }
  })
);

//PROFILE
userRoute.get(
  "/:id/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
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
userRoute.put(
  "/:id/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
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

export default userRoute;
