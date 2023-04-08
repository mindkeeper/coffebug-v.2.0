require("dotenv").config();
const express = require("express");

const cors = require("cors");
const sequelize = require("./src/config/sequelize");
const User = require("./src/models/user");
const Role = require("./src/models/role");
const Permission = require("./src/models/permission");
const RolePermissions = require("./src/models/rolePermissions");
const Profile = require("./src/models/profile");
const mainRouter = require("./src/routes/main");
const responseMiddleware = require("./src/helpers/sendResponse");
const Token = require("./src/models/token");
const cron = require("node-cron");
const removeAccessToken = require("./src/helpers/removeAccessToken");

const app = express();
User.hasOne(Profile, { onDelete: "CASCADE" });
Profile.belongsTo(User, { onDelete: "RESTRICT" });
Role.hasMany(User);
User.belongsTo(Role);
Permission.belongsToMany(Role, { through: RolePermissions });
Token.belongsTo(User);
User.hasOne(Token);

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.raw());
app.use(express.json());
app.use(responseMiddleware);
app.use(mainRouter);
cron.schedule("* * 1 * *", removeAccessToken);
sequelize
  .sync()
  // .then(() => {
  //   return Role.create({ name: "Owner" });
  // })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`server running at port ${process.env.PORT}`)
);
