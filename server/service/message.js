const assert = require('assert');
const { sendGroupMsg, sendUserMsg, getGroupMsgAsync, getUserMsgAsync } = require('../dao/message');
const { getById } = require('../dao/user');
const { getGroupInfo } = require('../dao/group_info');

async function createMsg(to, content, type, targetType, userId) {
    let msg = {
        status: -3,
        message: '数据库错误'
    };
    try {
        let to_info;
        if(targetType === 'group') {
            to_info = await getGroupInfo(to);
            assert(to_info, '群组不存在');
            try {
                await sendGroupMsg(userId, to, content, type);
            } catch(e) {
                console.log(e);
            }
        } else if (targetType === 'user') {
            to_info = await getById(to);
            assert(to_info, '用户不存在');
            try {
                await sendUserMsg(userId, to, content, type);
            } catch(e) {
                console.log(e);
            }
        }
        const from = await getById(userId);
        console.log(to_info)
        msg = { from: from[0], to: to_info[0], content, type, targetType };
    } catch(e) {
        console.log(e);
    }
    return msg;
}

async function bindAllGroupMsgs(groups) {
    const promises = groups.map(group => getGroupMsgAsync(group.id));
    const res = await Promise.all(promises);
    return groups.map((item, index) => {
        let msgs = res[index] ? res[index].reverse() : [];
        return {
            ...item,
            msgs
        }
    });
}

async function bindAllUserMsgs(userId, friends) {
    const promises = friends.map(friend => getUserMsgAsync(userId, friend.id));
    const res = await Promise.all(promises);
    return friends.map((item, index) => {
        let msgs = res[index] ? res[index].reverse() : [];
        return {
            ...item,
            msgs
        }
    });
}

async function getDefaultGroupMsgs() {

}

module.exports = {
    createMsg,
    bindAllGroupMsgs,
    bindAllUserMsgs
};