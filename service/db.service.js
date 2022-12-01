const env = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

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
db.Otp = require('../models/Otpschema')(sequelize, Sequelize);
db.Parameters = require('../models/mw_parameters')(sequelize, Sequelize);
db.Mw_functions = require('../models/mw_functions_masters')(sequelize, Sequelize);
db.Mw_codemasters = require('../models/mw_code_masters')(sequelize, Sequelize);
db.Mw_codefolders = require('../models/mw_code_folders')(sequelize, Sequelize);
db.mwfilenames = require('../models/mw_file_name')(sequelize, Sequelize);


db.Otp.belongsTo(db.User, { as: "UserSchema", foreignKey: "user_key" });


module.exports = db;