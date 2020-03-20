const Sequelize = require('sequelize');
const sequelize = require('./index');

const FriendLink = sequelize.define('friendLink', {
    id_self: {
        type: Sequelize.UUID,
        allowNull: false
    },
    id_friend: {
        type: Sequelize.UUID,
        allowNull: false
    },
    createTime: {
        type: Sequelize.TIME,
        allowNull: false
    }
});

module.exports = FriendLink;