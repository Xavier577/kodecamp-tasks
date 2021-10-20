//@ts-check
import jwt from "jsonwebtoken";

/**
 * JSDoc style named function type
 * @callback Middleware
 * @param {Request} req
 * @param { Response} res
 * @param { import("express").NextFunction} next
 * @returns {void}
 */

/** @type Middleware */
const authenticate = (req, res, next) => {
  // check if user is authenticated
  // authenticate user
};

export default authenticate;
