const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mw_file_name', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    function_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    function_code: {
      type: DataTypes.STRING(200),
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
    }
  }, {
    sequelize,
    tableName: 'mw_file_name',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mw_file_name_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
