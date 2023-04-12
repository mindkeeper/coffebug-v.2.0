const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/sequelize");

const Categories = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Categories;
