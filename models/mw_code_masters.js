const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mw_code_masters', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    code_type: {
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
    tableName: 'mw_code_masters',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mw_code_masters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
