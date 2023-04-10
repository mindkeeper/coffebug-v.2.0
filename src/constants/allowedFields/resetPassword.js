const joi = require("joi");
const resetPassword = joi.object({
  newPassword: joi
    .string()
    .min(6)
    .max(20)
    .trim()
    .required()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/)
    .messages({
      "string.pattern.base":
        "Password must contain minimum 1 letter and 1 number",
      "string.min": "the minimum length of password is 6",
      "string.max": "the maximum length of password is 20",
    }),
  confirmPassword: joi
    .string()
    .min(6)
    .max(20)
    .trim()
    .required()
    .pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/)
    .messages({
      "string.pattern.base":
        "Password must contain minimum 1 letter and 1 number",
      "string.min": "the minimum length of password is 6",
      "string.max": "the maximum length of password is 20",
    }),
  otp: joi
    .alternatives()
    .try(joi.string().min(6).max(6), joi.number().min(6).max(6))
    .required()
    .messages({
      "any.required": "Please Input your OTP",
      "alternatives.includesOne":
        "OTP must have minimum length/value of 6",
    }),
});

module.exports = resetPassword;
