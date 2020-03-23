const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const { saltRounds } = require('../config');
const { createInfo } = require('../dao/user');
const { create, getByEmail } = require('../dao/login_info');
const { promisify } = require('util');
const bcryptAsync = promisify(bcrypt.hash);
//const asyncWrapper = require('../utils/asyncWrapper');

async function register(email, nickname, password) {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try{
        const result = await getByEmail(email);
        if(!result.length) {
            const id = v4();
            await createInfo(id ,nickname);
            try{
                const hash =  await bcryptAsync(password, saltRounds);
                try{
                    await create(id, email, hash);
                    response = {
                        status: 0,
                        message: 'SUCCESS'
                    };
                } catch(e) {
                    console.log(e);
                } 
            } catch(e) {
                console.log(e);
                response = {
                    status: -2,
                    message: '哈希错误'
                };
            }
        } else {
            response = {
                status: -1,
                message: '邮箱已注册'
            }
        }
    } catch(e) {
        console.log(e);
    }
    
    return response;
}

module.exports = register;