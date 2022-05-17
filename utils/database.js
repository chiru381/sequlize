const Sequelize = require("sequelize");

const sequelize = new Sequelize("chiru", "root", "9010813851", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
