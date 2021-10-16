//@ts-check
const express = require("express");
const upload = require("../helpers/upload");
const {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controller/users");

const userRouter = express.Router();

// get all users
userRouter.get("/all", getAllUsers);

// get a single user with an id
userRouter.get("/:id", getUser);

// add a user
userRouter.post("/new", upload.single("profile_pic"), addUser);

// update a user
userRouter.put("/update/:id", upload.single("profile_pic"), updateUser);

// delete a user
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
