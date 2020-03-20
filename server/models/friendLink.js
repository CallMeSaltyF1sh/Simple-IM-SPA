const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const FriendLink = sequelize.define('friendLink', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_self: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    id_friend: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true,
    updatedAt: false
});

module.exports = FriendLink;