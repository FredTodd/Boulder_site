const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const IndoorClimb = sequelize.define('IndoorClimb', {
  climb_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'user_id'
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  personal_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  climb_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'indoor', // Set default type to 'indoor'
  },
}, {
  tableName: 'IndoorClimbs',
  timestamps: false,
});

module.exports = IndoorClimb;
