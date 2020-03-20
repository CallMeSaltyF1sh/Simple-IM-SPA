const Sequelize = require('sequelize');
const sequelize = require('./index');

const Login = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastLoginTime: {
        type: Sequelize.TIME,
        allowNull: false
    }
});

module.exports = Login;