const express = require("express");
const authorization = require("../middleware/authorization");
const { getUserProfile } = require("../controllers/user");

const userRouter = express.Router();

userRouter.get("/profile", authorization, getUserProfile);

module.exports = userRouter;
