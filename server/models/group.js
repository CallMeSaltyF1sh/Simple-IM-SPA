const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Group = sequelize.define('groupDetail', {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    owner: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    avatar: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true,
    updatedAt: false
});

Group.belongsTo(User, {
    foreignKey: 'owner'
});
Group.belongsToMany(User, {
    through: 'groupLink'
});

module.exports = Group;