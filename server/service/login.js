const bcrypt = require('bcrypt');
const { getById } = require('../dao/user');
const { getByEmail, updateLoginTime } = require('../dao/login_info');

async function login(email, password) {
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
                response = {
                    status: 0,
                    message: 'SUCCESS',
                    data: info
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

module.exports = login;