const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = Role;
