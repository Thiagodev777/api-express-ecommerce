const Sequelize = require("sequelize");
const Datatypes = Sequelize.DataTypes;
const sequelize = require("../../config/database/Connection");

const User = sequelize.define(
  "User",
  {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

User.sync({ force: false });

module.exports = User;
