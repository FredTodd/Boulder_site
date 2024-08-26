require('dotenv').config({ path: __dirname + '/../.env' });

console.log('DB_USER:', process.env.DB_USER); // Log the database variables
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_HOST:', process.env.DB_HOST);

module.exports = {
  development: {
    username: process.env.DB_USER, // Use environment variables for DB connection
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql', // Set dialect to MySQL
    logging: console.log, // Enable SQL query logging
  },
  test: {
    username: process.env.DB_USER, // Use environment variables for DB connection
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable logging
  },
  production: {
    username: process.env.DB_USER, // Use environment variables for DB connection
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Disable logging
  }
};
