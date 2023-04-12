const mainRouter = require("express").Router();
const authRouter = require("./auth");
const productRouter = require("./product");
const prefix = "/api";

mainRouter.use(`${prefix}/auth`, authRouter);
mainRouter.use(`${prefix}/product`, productRouter);

module.exports = mainRouter;
