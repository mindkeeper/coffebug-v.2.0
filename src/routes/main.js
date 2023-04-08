const mainRouter = require("express").Router();
const authRouter = require("./auth");
const prefix = "/api";

mainRouter.use(`${prefix}/auth`, authRouter);

mainRouter.get("/", (req, res) => {
  res.sendSuccess(200, {
    msg: "Welcome",
  });
});
mainRouter.get("/welcome", (req, res) =>
  res.status(200).json({ msg: "welcome" })
);
module.exports = mainRouter;
