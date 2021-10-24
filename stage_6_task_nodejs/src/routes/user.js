const express = require("express");
const authorization = require("../middleware/authorization");
const {
  getUserProfile,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/profile", authorization, getUserProfile);

userRouter.put("/profile/update", authorization, updateUser);

userRouter.delete("/profile/delete", deleteUser);

module.exports = userRouter;
