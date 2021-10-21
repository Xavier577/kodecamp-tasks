// @ts-check
const express = require("express");
const { loginUser, createUser } = require("../controllers/user");
const authRouter = express.Router();

//login
authRouter.post("/login", loginUser);

authRouter.post("/signup", createUser);

module.exports = authRouter;
