const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/config');
const User = sequelize.define('user', {
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10000,
    validate: {
      min: 0, // Balance cannot be negative
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = { User };
