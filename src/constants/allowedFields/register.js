const joi = require("joi");

const registerSchema = joi
  .object({
    username: joi.string().required(),
    email: joi.string().email().required().messages({
      "string.empty": "Email harus diisi",
      "string.email": "Email harus valid",
    }),
    password: joi.string().required(),
    phone: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
  })
  .options({ allowUnknown: true });

module.exports = registerSchema;
