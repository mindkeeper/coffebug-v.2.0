const joi = require("joi");
const login = joi.object({
  emailOrUsername: joi
    .string()
    .trim()
    .required()
    .messages({ "any.required": "Email or Username Cannot be Empty" }),

  password: joi
    .string()
    .trim()
    .required()
    .min(6)
    .max(20)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))
    .messages({
      "any.required": "Password tidak boleh kosong",
      "number.min": "Panjang password minimum 6",
      "number.max": "Panjang password max 20",
      "string.pattern.base":
        "Password harus memiliki minimal 1 haruf dan 1 angka",
    }),
});

module.exports = login;
