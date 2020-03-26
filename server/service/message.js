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
        if(targetType === 'group') {
            const group = await getGroupInfo(to);
            assert(group, '群组不存在');
            try {
                await sendGroupMsg(userId, to, content, type);
            } catch(e) {
                console.log(e);
            }
        } else if (targetType === 'user') {
            const user = await getById(to);
            assert(user, '用户不存在');
            try {
                await sendUserMsg(userId, to, content, type);
            } catch(e) {
                console.log(e);
            }
        }
        const from = await getById(userId);
        msg = { from: from[0], to, content, type, targetType };
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