//@ts-check
const express = require("express");
const mockData = require("../model/database");
const multer = require("multer");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

const userRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// get all users
userRouter.get("/all", getAllUsers);

// get a single user with an id
userRouter.get("/:id", getUser);

// add a user
userRouter.post("/new", addUser);

// update a user
userRouter.put("/update/:id", updateUser);

// delete a user
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
