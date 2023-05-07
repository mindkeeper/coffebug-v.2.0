const joi = require("joi");

const product = joi.object({
  title: joi
    .string()
    .trim()
    .max(255)
    .min(5)
    .required()
    .messages({ "any.required": "product title cannot be empty" }),
  quantity: joi
    .string()
    .required()
    .trim()
    .pattern(/^\d+$/)
    .messages({
      "string.base": "quantity must be a number",
      "string.pattern.base": "quantity must be a positive integer",
    })
    .custom((value, helpers) => {
      const num = parseInt(value);
      if (isNaN(value) || num < 0) return helpers.error("any.invalid");
      return num;
    }),
  price: joi
    .string()
    .required()
    .trim()
    .pattern(/^\d{3,}$/)
    .messages({
      "string.base": "Price must be a number",
      "string.pattern.base":
        "Price must be a positive integer with at least 3 digits",
    })
    .custom((value, helpers) => {
      const num = parseInt(value);
      if (isNaN(num) || num <= 0) {
        return helpers.error("any.invalid");
      }
      return num;
    }),
  description: joi
    .string()
    .required()
    .messages({ "any.required": "Please Input a description" }),
  categoryId: joi
    .string()
    .required()
    .messages({ "any.required": "Please input category" }),
});

module.exports = product;
