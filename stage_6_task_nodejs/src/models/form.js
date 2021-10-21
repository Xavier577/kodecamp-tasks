// @ts-check
const Joi = require("joi");

const ValidationSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});

module.exports = ValidationSchema;
