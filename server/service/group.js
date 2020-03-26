const { createGroup, getGroupInfo } = require('../dao/group_info');
const { joinInGroup } = require('../dao/group_link');
const { v4 } = require('uuid');

async function create(name, owner) {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        const id = v4();
        await createGroup(id, name, owner);
        await joinInGroup(owner, id);
        const newGroup = await getGroupInfo(id);
        response = {
            status: 0,
            message: 'SUCCESS',
            data: newGroup[0]
        }
    } catch(e) {
        console.log(e);
    }
    return response;
}

module.exports = {
    create
};