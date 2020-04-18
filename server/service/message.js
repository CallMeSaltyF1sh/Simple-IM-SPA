const assert = require('assert');
const { 
    sendGroupMsg, 
    sendUserMsg, 
    getGroupMsgAsync, 
    getUserMsgAsync,
    getGroupMsgByTime,
    getUserMsgByTime,
    getUnreadGroupMsgAsync,
    getUnreadUserMsgAsync
} = require('../dao/message');
const { getById } = require('../dao/user');
const { getGroupInfo } = require('../dao/group_info');
const { addUserMsgUnreadCnt, clearUserMsgUnreadCnt } = require('../dao/friend_link');
const { addGroupMsgUnreadCnt, clearGroupMsgUnreadCnt } = require('../dao/group_link');

async function createMsg(to, content, type, targetType, userId) {
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        let to_info;
        if(targetType === 'group') {
            to_info = await getGroupInfo(to);
            assert(to_info.length, '群组不存在');
            try {
                await sendGroupMsg(userId, to, content, type);
                await addGroupMsgUnreadCnt(userId, to);
            } catch(e) {
                console.log(e);
            }
        } else if (targetType === 'user') {
            to_info = await getById(to);
            assert(to_info.length, '用户不存在');
            try {
                await sendUserMsg(userId, to, content, type);
                await addUserMsgUnreadCnt(to, userId);
            } catch(e) {
                console.log(e);
            }
        }
        const from = await getById(userId);
        response = { from: from[0], to: to_info[0], content, type };
    } catch(e) {
        console.log(e);
    }
    return response;
}

async function bindAllGroupMsgs(groups) {
    const promises = groups.map(group => {
        if(group.unread) {
            return getUnreadGroupMsgAsync(group.id, group.unread);
        } else {
            return getGroupMsgAsync(group.id);
        }
    });
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
    const promises = friends.map(friend => {
        if(friend.unread) {
            return getUnreadUserMsgAsync(userId, friend.id, friend.unread);
        } else {
            return getUserMsgAsync(userId, friend.id);
        }
    });
    const res = await Promise.all(promises);
    return friends.map((item, index) => {
        let msgs = res[index] ? res[index].reverse() : [];
        return {
            ...item,
            msgs
        }
    });
}

async function getHistoryMsgs(id_group, id_usr, id_friend, time) {
    assert(time, '消息时间不为空');
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        let msgList = [];
        if(id_group) {
            msgList = await getGroupMsgByTime(id_group, time);
        } else {
            assert(id_usr&&id_friend, '用户和好友id不为空');
            msgList = await getUserMsgByTime(id_usr, id_friend, time);
        }
        response = {
            status: 0,
            message: 'SUCCESS',
            data: msgList
        };
    } catch(e) {
        console.log(e);
    }
    return response;
}

async function clearUnreadCnt(targetType, targetId, userId) {
    assert(targetId&&targetType, 'targetId和targetType不为空');
    let response = {
        status: -3,
        message: '数据库错误'
    };
    try {
        if(targetType === 'group') {
            await clearGroupMsgUnreadCnt(userId, targetId);
        } else {
            await clearUserMsgUnreadCnt(userId, targetId);
        }
        response = {
            status: 0,
            message: 'SUCCESS'
        };
    } catch(e) {
        console.log(e);
    }
    return response;
}

module.exports = {
    createMsg,
    bindAllGroupMsgs,
    bindAllUserMsgs,
    getHistoryMsgs,
    clearUnreadCnt
};