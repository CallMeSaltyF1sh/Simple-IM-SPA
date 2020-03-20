const Sequelize = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
});

module.exports = User;