const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.NAME_DATABASE,
  process.env.USER_DATABASE,
  process.env.PASSWORD_DATABASE,
  {
    host: process.env.HOST_DATABASE,
    dialect: process.env.TYPE_DATABASE,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));

module.exports = sequelize;
