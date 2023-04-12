const Categories = require("./category");
const Otp = require("./otp");
const Permission = require("./permission");
const Product = require("./product");
const ProductImages = require("./productImages");
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

Product.belongsTo(Categories);
Categories.hasMany(Product);
Product.hasMany(ProductImages);
ProductImages.belongsTo(Product);
module.exports = {
  User,
  Profile,
  Role,
  RolePermissions,
  Permission,
  Token,
  Otp,
};
