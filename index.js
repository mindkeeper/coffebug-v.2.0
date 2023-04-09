require("dotenv").config();
require("pg");
const path = require("path");
const express = require("express");

const cors = require("cors");
const sequelize = require("./src/config/sequelize");
const mainRouter = require("./src/routes/main");
const responseMiddleware = require("./src/helpers/sendResponse");
const cron = require("node-cron");
const removeAccessToken = require("./src/helpers/removeAccessToken");

const {
  User,
  Profile,
  Role,
  RolePermissions,
  Permission,
  Token,
  Otp,
} = require("./src/models/associations");
const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.raw());
app.use(express.json());
app.use(responseMiddleware);
app.use(mainRouter);
cron.schedule("* * 1 * *", removeAccessToken);
app.get("/", (req, res) => res.json({ msg: "Welcome" }));

app.get("/testing", (req, res) =>
  res.status(200).render("forgot-password", { title: "forgot passwprd" })
);
sequelize
  .sync()
  // .then(() => {
  //   return Role.create({ name: "Owner" });
  // })
  .then(() =>
    app.listen(3000, () => console.log(`server running at port 3000`))
  )
  .catch((err) => console.log(err));
