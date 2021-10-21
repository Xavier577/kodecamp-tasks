/**
 * JSDoc style named function type
 * @callback Middleware
 * @param {import("express").Request} req
 * @param { import("express").Response} res
 * @param { import("express").NextFunction} next
 * @returns {void | any}
 */
// @ts-check
const Users = require("../database/Users");
const Profiles = require("../database/Profiles");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const User = require("../models/user");
const Profile = require("../models/profile");
const ValidationSchema = require("../models/form");

/** @type Middleware */
const loginUser = (req, res) => {
  const { email, password } = req.body;
  // check if user provided valid email and password

  if (!email && !password)
    return res.status(404).json({ message: "cannot pass in empty fields" });
  const user = Users.find((user) => user.email === email);

  if (!user) return res.status(401).json({ message: "invalid email" });
  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) return res.status(401).json({ message: "incorrect password" });
  const token = jwt.sign({ id: user.id }, "lucifer_secret", {
    expiresIn: "2d",
  });

  res
    .status(200)
    .json({ token: `Bearer ${token}`, message: "user successfully signed in" });
};

/** @type Middleware */
const createUser = async (req, res) => {
  try {
    const data = await ValidationSchema.validateAsync(req.body);
    let { name, email, password } = data;

    password = bcrypt.hashSync(password, 10);

    let profile = new Profile(uuid.v4(), name, email);
    let user = new User(profile, password, "pending");

    Users.push(user);
    Profiles.push(profile);

    res.json({ okay: true, message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(404).json(error.details);
  }
};

/** @type Middleware */
const getUserProfile = (req, res, next) => {
  // handles getting of userProfile
  const id = res.locals.userId;
  const profile = Profiles.find((profile) => profile.id === id);
  res.json({ profile });
};

module.exports = {
  createUser,
  getUserProfile,
  loginUser,
};
