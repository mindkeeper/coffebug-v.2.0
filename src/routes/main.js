const mainRouter = require("express").Router();
const authRouter = require("./auth");
const prefix = "/api";

mainRouter.use(`${prefix}/auth`, authRouter);

// mainRouter.get("/", (req, res) => {
//   res.sendSuccess(200, {
//     msg: "Welcome",
//   });
// });

module.exports = mainRouter;
