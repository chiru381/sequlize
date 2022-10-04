const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('otpschema', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_key: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'userschema',
        key: 'user_key'
      }
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'otpschema',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "id",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
