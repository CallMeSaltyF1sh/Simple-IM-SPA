const Sequelize = require('sequelize');
const sequelize = require('./index');
const Group = require('./group');
const User = require('./user');

const GroupLink = sequelize.define('groupLink', {
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
    id_group: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
            model: Group,
            key: 'id'
        }
    },
    nickname: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: true,
    createdAt: 'joinedAt',
    updatedAt: false
});

module.exports = GroupLink;