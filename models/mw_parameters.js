const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mw_parameters', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    s3_accesskey: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    s3_secret_accesskey: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    s3_region: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    s3_bucket: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'mw_parameters',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mw_parameters_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
