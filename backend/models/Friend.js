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

// Define associations with aliases to avoid conflict
User.hasMany(Friend, { foreignKey: 'user_id', as: 'userFriends' });
User.hasMany(Friend, { foreignKey: 'friend_id', as: 'friendFriends' });

Friend.belongsTo(User, { foreignKey: 'user_id', as: 'userDetails' });
Friend.belongsTo(User, { foreignKey: 'friend_id', as: 'friendDetails' });

module.exports = Friend;
