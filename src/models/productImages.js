const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const ProductImages = sequelize.define(
  "productImages",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    underscored: true,
    paranoid: true,
  }
);

module.exports = ProductImages;
