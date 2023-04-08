const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = User;
