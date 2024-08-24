const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); 

const Friend = sequelize.define('Friend', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  friend_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Friends',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'friend_id'], // Enforce unique friendships
    }
  ]
});

User.hasMany(Friend, { foreignKey: 'user_id' });
User.hasMany(Friend, { foreignKey: 'friend_id' });
Friend.belongsTo(User, { foreignKey: 'user_id' });
Friend.belongsTo(User, { foreignKey: 'friend_id' });

module.exports = Friend;
