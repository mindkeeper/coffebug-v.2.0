const Otp = require("./otp");
const Permission = require("./permission");
const Profile = require("./profile");
const Role = require("./role");
const RolePermissions = require("./rolePermissions");
const Token = require("./token");
const User = require("./user");

User.hasOne(Profile, { onDelete: "CASCADE" });
Profile.belongsTo(User, { onDelete: "RESTRICT" });
User.belongsTo(Role);
Role.hasMany(User);
Token.belongsTo(User);
User.hasOne(Token, { onDelete: "CASCADE" });
Permission.belongsToMany(Role, { through: RolePermissions });
User.hasMany(Otp, { onDelete: "CASCADE" });
Otp.belongsTo(User);

module.exports = {
  User,
  Profile,
  Role,
  RolePermissions,
  Permission,
  Token,
  Otp,
};
