const Sequelize = require("sequelize");
const Datatypes = Sequelize.DataTypes;
const sequelize = require("../../config/database/Connection");

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
    price: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    image: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

Product.sync({ force: false });

module.exports = Product;
