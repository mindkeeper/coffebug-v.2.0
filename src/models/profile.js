const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Profile = sequelize.define(
  "profile",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    displayName: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
    gender: { type: DataTypes.ENUM("Male", "Female"), allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
  },
  {
    paranoid: true,
    underscored: true,
  }
);
module.exports = Profile;
