const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cc', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;