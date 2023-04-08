const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const uuid = require("uuid");

const RolePermissions = sequelize.define(
  "rolePermission",
  {
    id: {
        type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => uuid.v4(),
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = RolePermissions;
