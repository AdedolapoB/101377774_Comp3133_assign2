// validation/userValidation.js

const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
});

module.exports = {
  signupSchema,
};
