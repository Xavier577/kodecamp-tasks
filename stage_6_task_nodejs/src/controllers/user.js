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
    let { userName, email, password } = data;

    const userExists = Users.some((user) => user.email === email);
    if (userExists)
      return res
        .status(401)
        .json({ message: `a user with the email ${email} already exists` });

    password = bcrypt.hashSync(password, 10);

    let profile = new Profile(uuid.v4(), userName, email);
    let user = new User(profile, password, "pending");

    Users.push(user);
    Profiles.push(profile);

    res.json({ okay: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json(error.details);
  }
};

/** @type Middleware */
const getUserProfile = (req, res, next) => {
  const id = res.locals.userId;
  const profile = Profiles.find((profile) => profile.id === id);
  res.json({ profile });
};

/** @type Middleware */
const updateUser = (req, res) => {
  const id = res.locals.userId;
  /** @typedef {Object} UserFields
   * @property {string} userName
   * @property {string} email
   * @property {string} password
   * @property {string} status
   */
  /**@type UserFields */
  let { userName, email, password, status } = req.body;
  let user = Users.find((user) => user.id === id);
  let profile = Profiles.find((profile) => profile.id === id);
  if (!user) return res.status(404).json({ message: "user does not exist" });
  if (userName || email || password || status) {
    if (userName) {
      // @ts-ignore
      user.update({ userName });
      // @ts-ignore
      profile.update({ userName });
    }
    if (email) {
      // @ts-ignore
      user.update({ email });
      // @ts-ignore
      profile.update({ email });
    }
    if (password) {
      password = bcrypt.hashSync(password, 10);
      // @ts-ignore
      user.update({ password });
    }
    if (status) {
      // @ts-ignore
      user.update({ status });
    }
    res.status(200).json({ message: "user sucessfully updated" });
  } else {
    res.status(404).json({ message: "cannot update with empty fields" });
  }
};
/**@type Middleware */
const deleteUser = (req, res) => {
  const id = res.locals.userId;
  console.log(id, res.locals);
  return;
  if (!id)
    return res
      .status(404)
      .json({ message: "user does not exist or has already been deleted" });

  const userIdx = Users.findIndex((user) => user.id === id);
  const profileIdx = Profiles.findIndex((profile) => profile.id === id);

  if (userIdx > -1 && profileIdx > -1) {
    const profile = Profiles[profileIdx];

    Users.splice(userIdx, 1);
    Profiles.splice(profileIdx, 1);

    res.status(200).json({ message: `${profile.userName} has been deleted ` });
    res.redirect("/");
  } else res.status(500);
};

module.exports = {
  createUser,
  deleteUser,
  getUserProfile,
  loginUser,
  updateUser,
};
