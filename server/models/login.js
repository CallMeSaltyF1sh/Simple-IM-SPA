const Sequelize = require('sequelize');
const sequelize = require('./index');
const User = require('./user');

const Login = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    id_usr: {
        type: Sequelize.UUIDV4,
        unique: true,
        references: {
            model: User,
            key: 'id'
        }
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
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultVaule: false
    },
}, {
    timestamps: true,
    updatedAt: 'lastLogin'
});

Login.belongsTo(User, {
    foreignKey: 'id_usr'
});

module.exports = Login;