var DataTypes = require("sequelize").DataTypes;
var _mw_code_folders = require("./mw_code_folders");
var _mw_code_masters = require("./mw_code_masters");
var _mw_functions_masters = require("./mw_functions_masters");
var _mw_parameters = require("./mw_parameters");
var _otpschema = require("./otpschema");
var _userschema = require("./userschema");

function initModels(sequelize) {
  var mw_code_folders = _mw_code_folders(sequelize, DataTypes);
  var mw_code_masters = _mw_code_masters(sequelize, DataTypes);
  var mw_functions_masters = _mw_functions_masters(sequelize, DataTypes);
  var mw_parameters = _mw_parameters(sequelize, DataTypes);
  var otpschema = _otpschema(sequelize, DataTypes);
  var userschema = _userschema(sequelize, DataTypes);

  otpschema.belongsTo(userschema, { as: "user_key_userschema", foreignKey: "user_key"});
  userschema.hasMany(otpschema, { as: "otpschemas", foreignKey: "user_key"});

  return {
    mw_code_folders,
    mw_code_masters,
    mw_functions_masters,
    mw_parameters,
    otpschema,
    userschema,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
