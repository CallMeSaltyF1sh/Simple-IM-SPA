const User = require('../models/user');

async function createUser(info) {
    return User.create(info);
}

async function getUserById(id) {
    return User.findById(id);
}

async function getUserByEmail(email) {
    return User.findAll({
        attributes: { exclude: ['password'] },
        where: {
            email: email
        }
    })
}

async function getUsersByNickname(nickname) {
    return User.findAll({
        attributes: { exclude: ['password'] },
        where: {
            nickname: nickname
        }
    })
}

async function updateUserInfo(id, info) {
    const user = await getUserById(id);
    if(user) {
        return user.update(info);
    } else {
        throw new Error(`User with id ${id} is not exist.`);
    }
}

async function deleteUser(id) {
    const user = await getUserById(id);
    if(user) {
        return user.destory();
    }
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail,
    getUsersByNickname,
    updateUserInfo,
    deleteUser
};