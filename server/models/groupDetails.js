const Sequelize = require('sequelize');
const sequelize = require('./index');

const GroupDetail = sequelize.define('groupDetail', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    owner: {
        type: Sequelize.UUID,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = GroupDetail;