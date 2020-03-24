const { createGroup } = require('../dao/group_info');
const { v4 } = require('uuid');

async function create(name, owner) {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        const id = v4();
        const res = await createGroup(id, name, owner);
        console.log(res);
        response = {
            status: 0,
            message: 'SUCCESS'
        }
    } catch(e) {
        console.log(e);
    }
    return response;
}

module.exports = {
    create
};