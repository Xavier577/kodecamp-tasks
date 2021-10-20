import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

//login
authRouter.post("/login", (req, res) => {
  // check if user provided valid email and password
  // check if user with such email exist in db
  // compare password to stored password
});

authRouter.post("/signup", (req, res) => {});

export default authRouter;
