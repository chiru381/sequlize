const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userschema', {
    user_key: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    updated_by: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // status: {
    //   type: DataTypes.STRING(255),
    //   allowNull: false
    // }
  },
  
  {
    sequelize,
    tableName: 'userschema',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_key",
        unique: true,
        fields: [
          { name: "user_key" },
        ]
      },
    ]
  }
  );
};
