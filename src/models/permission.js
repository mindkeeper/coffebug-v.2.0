const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Permission = sequelize.define(
  "permission",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => uuid.v4(),
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = Permission;
