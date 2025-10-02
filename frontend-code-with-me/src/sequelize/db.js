const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password');

module.exports = sequelize;