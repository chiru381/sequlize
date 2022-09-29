const env = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/UserSchema')(sequelize, Sequelize);

// db.Otp.belongsTo(db.User, { as: "UserSchema", foreignKey: "user_key" });


module.exports = db;