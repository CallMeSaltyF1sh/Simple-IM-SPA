const Sequelize = require('sequelize');
const sequelize = require('./index');
const Login = require('./login');
const Group = require('./group');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});

User.hasOne(Login, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.belongsToMany(Group, {
    through: 'groupLink'
});
User.belongsToMany(User, {
    through: 'friendLink'
});

module.exports = User;