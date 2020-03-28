const assert = require('assert');
const { createGroup, getGroupInfo, getDefaultGroup } = require('../dao/group_info');
const { joinInGroup } = require('../dao/group_link');
const { getGroupMsg } = require('../dao/message');
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

async function getGroupById(id) {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        const res = await getGroupInfo(id);
        response = {
            status: 0,
            message: 'SUCCESS',
            data: res[0]
        }
    } catch(e) {
        console.log(e);
    }
    return response;
}

async function getDefaultGroupInfo() {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        const group = await getDefaultGroup();
        assert(group, '不存在默认群组');
        console.log(group);
        const msgs = await getGroupMsg(group[0].id);
        if(msgs) {
            response = {
                status: 0,
                message: 'SUCCESS',
                data: {
                    ...group[0],
                    msgs
                }
            }
        }
    } catch(e) {
        console.log(e);
    }
    return response;
}

module.exports = {
    create,
    getGroupById,
    getDefaultGroupInfo
};