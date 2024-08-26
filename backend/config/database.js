const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, // Set up a new Sequelize instance
  dialect: 'mysql', // Use MySQL as the dialect
  logging: console.log, // Enable SQL query logging
});

sequelize.authenticate() // Test database connection
  .then(() => {
    console.log('Connection has been established successfully.'); // Connection successful
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err); // Log connection error
  });

module.exports = sequelize; // Export the Sequelize instance
