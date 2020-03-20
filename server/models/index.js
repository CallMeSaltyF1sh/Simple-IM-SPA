const Sequelize = require('sequelize');
const { mysql_config } = require('../config');
const { host, database, user, password } = mysql_config;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0
    }
});

module.exports = sequelize;