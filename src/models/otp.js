const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Otp = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(Date.now() + 30 * 60 * 1000),
    },
    status: {
      type: DataTypes.ENUM("Active", "Used", "Expired"),
      allowNull: false,
      defaultValue: "Active",
    },
  },
  {
    underscored: true,
  }
);

Otp.belongsTo(User)
module.exports = Otp;
