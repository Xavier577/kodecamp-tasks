//@ts-check

/**
 * JSDoc style named function type
 * @callback Middleware
 * @param {Request} req
 * @param { Response} res
 * @param { import("express").NextFunction} next
 * @returns {void}
 */
/** @type Middleware */
export const loginUser = (req, res, next) => {
  // handle login logic
};

/** @type Middleware */
export const createUser = (req, res, next) => {
  //handle signup logic
};

/** @type Middleware */
export const getUserProfile = (req, res, next) => {
  // handles getting of userProfile
};
