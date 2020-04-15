const query = require('../utils/query');

const sql = {
    insertUsrMsg: `
        INSERT INTO message(from_id, to_user, content, msg_type, created_at)
         VALUES (?, ?, ?, ?, now())
    `,
    insertGroupMsg: `
        INSERT INTO message(from_id, to_group, content, msg_type, created_at)
         VALUES (?, ?, ?, ?, now())
    `,
    getMsgByGroupId: `
        SELECT * FROM message INNER JOIN user ON message.from_id=user.id
        WHERE to_group=? 
        ORDER BY created_at DESC
        LIMIT 0,20
    `,
    getMsgByUserId: `
        SELECT * FROM message INNER JOIN user ON message.from_id=user.id
        WHERE (from_id=? AND to_user=?) OR (from_id=? AND to_user=?)
        ORDER BY created_at DESC
        LIMIT 0,20
    `,
    getGroupMsgByTime: `
        SELECT * FROM message INNER JOIN user ON message.from_id=user.id
        WHERE to_group=? AND created_at<?
        ORDER BY created_at DESC
        LIMIT 0,20
    `,
    getUserMsgByTime: `
        SELECT * FROM message INNER JOIN user ON message.from_id=user.id
        WHERE ((from_id=? AND to_user=?) OR (from_id=? AND to_user=?)) AND created_at<?
        ORDER BY created_at DESC
        LIMIT 0,20
    `,
    getUnreadUserMsg: `
        SELECT * FROM message INNER JOIN user ON message.from_id=user.id
        WHERE from_id=? AND to_user=?
        ORDER BY created_at DESC
        LIMIT 0,?
    `,
    getUnreadGroupMsg: `
        SELECT * FROM message INNER JOIN user ON message.from_id=user.id
        WHERE to_group=? 
        ORDER BY created_at DESC
        LIMIT 0,?
    `
};

async function sendGroupMsg(id, id_group, content, type) {
    return await query(sql.insertGroupMsg, [id, id_group, content, type]);
}

async function sendUserMsg(id, id_usr, content, type) {
    return await query(sql.insertUsrMsg, [id, id_usr, content, type]);
}

async function getGroupMsg(id_group) {
    return await query(sql.getMsgByGroupId, [id_group]);
}

async function getUserMsg(id, id_usr) {
    return await query(sql.getMsgByUserId, [id, id_usr, id_usr, id]);
}

async function getGroupMsgByTime(id_group, time) {
    return await query(sql.getGroupMsgByTime, [id_group, time]);
}

async function getUserMsgByTime(id, id_usr, time) {
    return await query(sql.getUserMsgByTime, [id, id_usr, id_usr, id, time]);
}

function getGroupMsgAsync(id) {
    return query(sql.getMsgByGroupId, [id]);
}

function getUserMsgAsync(id, id_usr) {
    return query(sql.getMsgByUserId, [id, id_usr, id_usr, id]);
}

function getUnreadGroupMsgAsync(id_group, unread) {
    return query(sql.getUnreadGroupMsg, [id_group, unread]);
}

function getUnreadUserMsgAsync(id_self, id_friend, unread) {
    return query(sql.getUnreadUserMsg, [id_friend, id_self, unread]);
}

module.exports = {
    sendGroupMsg, 
    sendUserMsg,
    getGroupMsg,
    getUserMsg,
    getGroupMsgByTime,
    getUserMsgByTime,
    getGroupMsgAsync,
    getUserMsgAsync,
    getUnreadGroupMsgAsync,
    getUnreadUserMsgAsync
};