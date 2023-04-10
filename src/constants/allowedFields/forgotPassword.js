const joi = require("joi");
const forgotPassword = joi.object({
  emailOrUsername: joi
    .string()
    .trim()
    .required()
    .messages({ "any.required": "Email or Username Cannot be Empty" }),

  redirectPage: joi
    .string()
    .trim()
    .required()
    .messages({ "any.required": "Please Input your page link" }),
});

module.exports = forgotPassword;
