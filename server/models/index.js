const Sequelize = require('sequelize');
const { mysql_config } = require('../config');
const { host, database, user, password } = mysql_config;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql'
});

module.exports = sequelize;