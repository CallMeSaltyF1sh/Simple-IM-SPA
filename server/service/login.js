const bcrypt = require('bcrypt');
const { getById } = require('../dao/user');
const { getByEmail, updateLoginTime } = require('../dao/login_info');
const generateJWT = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/index');
const { getJoinedGroupsByUserId } = require('../dao/group');
const { updateSocket } = require('../dao/socket');

async function login(email, password, socket_id) {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        const user = await getByEmail(email);
        if(user.length) {
            const match = bcrypt.compareSync(password, user[0].password);
            if(match) {
                await updateLoginTime(email);
                const info = await getById(user.id);
                console.log(info);
                const groups = await getJoinedGroupsByUserId(user.id);
                console.log(groups);
                await updateSocket(socket_id, user.id);
                response = {
                    status: 0,
                    message: 'SUCCESS',
                    data: {
                        userInfo: info[0],
                        token: generateJWT(user.id, email),
                        groups: groups
                    }
                };
            } else {
                response = {
                    status: -1,
                    message: '密码错误'
                };
            }
        } else {
            response = {
                status: -2,
                message: '用户不存在'
            };
        }
    } catch(e) {
        console.log(e);
    }
    return response;
};

async function loginWithToken(token, socket_id) {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        const { userId, email } = decoded;
        try {
            const user = await getById(userId);
            console.log(user);
            if(user.length) {
                await updateLoginTime(email);
                const info = await getById(userId);
                console.log(info);
                const groups = await getJoinedGroupsByUserId(userId);
                console.log(groups);
                await updateSocket(socket_id, userId);
                response = {
                    status: 0,
                    message: 'SUCCESS',
                    data: {
                        userInfo: info[0],
                        groups: groups
                    }
                };
            }
        } catch(e) {
            console.log(e);
        }
    } catch(e) {
        console.log(e);
        return {
            status: -4,
            message: 'Token已过期，请重新登录emm...'
        };
    }
    return response;
}

module.exports = {
    login,
    loginWithToken
};