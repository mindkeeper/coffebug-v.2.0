const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Token = sequelize.define("token", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
module.exports = Token;
