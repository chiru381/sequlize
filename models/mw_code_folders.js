const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mw_code_folders', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    function_code: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    code_path_s3_key: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'mw_code_folders',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mw_code_folders_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
