/**
 * JSDoc style named function type
 * @callback Middleware
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void| any}
 */
// @ts-check
const jwt = require("jsonwebtoken");
const Users = require("../database/Users");

/** @type Middleware */
const authorization = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "lucifer_secret");
    if (data === "jwt expired") {
      res.status(404).json({ message: data });
      return;
    }
    //@ts-ignore
    const user = Users.find((user) => user.id === data.id);
    if (!user)
      return res
        .status(404)
        .json({
          message:
            "user with such token does not exist or must have been deleted",
        });
    // @ts-ignore
    res.locals.userId = data.id;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized user",
    });
  }

  // authenticate user
};

module.exports = authorization;
