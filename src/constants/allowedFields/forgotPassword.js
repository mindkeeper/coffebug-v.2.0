const joi = require("joi");
const forgotPassword = joi.object({
  emailOrUsername: joi
    .string()
    .trim()
    .required()
    .messages({ "any.required": "Email or Username Cannot be Empty" }),
});

module.exports = forgotPassword;
