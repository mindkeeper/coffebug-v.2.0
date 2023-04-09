const Route = require("express").Router();
const loginSchema = require("../constants/allowedFields/login");
const registerSchema = require("../constants/allowedFields/register");
const forgotSchema = require("../constants/allowedFields/forgotPassword");
const { register } = require("../controllers/auth/index");
const login = require("../controllers/auth/login");
const logout = require("../controllers/auth/logout");
const forgotPassword = require("../controllers/auth/forgotPassword");
const allowedBody = require("../middlewares/validations/allowedBody");
const isLogin = require("../middlewares/validations/isLogin");

Route.post("/register", allowedBody(registerSchema), register);
Route.post("/login", allowedBody(loginSchema), login);
Route.delete("/logout", isLogin, logout);
Route.post("/forgot-password", allowedBody(forgotSchema), forgotPassword);

module.exports = Route;
