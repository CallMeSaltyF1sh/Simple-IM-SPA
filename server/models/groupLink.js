const Sequelize = require('sequelize');
const sequelize = require('./index');

const GroupLink = sequelize.define('groupLink', {
    id_self: {
        type: Sequelize.UUID,
        allowNull: false
    },
    id_group: {
        type: Sequelize.UUID,
        allowNull: false
    },
    joinInTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = GroupLink;