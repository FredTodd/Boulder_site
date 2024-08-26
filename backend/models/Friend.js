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
      fields: ['user_id', 'friend_id'],
    }
  ]
});

// Define associations with aliases to avoid conflict
User.hasMany(Friend, { foreignKey: 'user_id', as: 'userFriends' }); // User associated with many Friends
User.hasMany(Friend, { foreignKey: 'friend_id', as: 'friendFriends' }); // User associated with many Friends as friends?? (hard to explain)

Friend.belongsTo(User, { foreignKey: 'user_id', as: 'userDetails' }); // Friend belongs to User
Friend.belongsTo(User, { foreignKey: 'friend_id', as: 'friendDetails' }); // Friend belongs to User as friend

module.exports = Friend;
