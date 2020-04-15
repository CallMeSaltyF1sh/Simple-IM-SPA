const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO group_link(id_self, id_group, joined_at)
         VALUES (?, ?, now())
    `,
    getAllJoinedGroups: `
        SELECT id_group FROM group_link WHERE id_self=?
    `,
    getAllGroupMembers: `
        SELECT id_self, joined_at FROM group_link WHERE id_group=?
    `,
    quitGroup: `
        DELETE FROM group_link WHERE id_self=? AND id_group=?
    `,
    incrementUnreadCnt: `
        UPDATE group_link SET unread=unread+1
        where id_self<>? and id_group=?
    `,
    clearUnreadCnt: `
        UPDATE group_link SET unread=0
        where id_self=? and id_group=?
    `
};

async function joinInGroup(id, id_group) {
    return await query(sql.insert, [id, id_group]);
}

async function getAllJoinedGroups(id) {
    return await query(sql.getAllJoinedGroups, [id]);
}

async function getAllGroupMembers(id_group) {
    return await query(sql.getAllGroupMembers, [id_group]);
}

async function quitGroup(id, id_group) {
    return await query(sql.quitGroup, [id, id_group]);
}

async function clearGroupMsgUnreadCnt(id_self, id_group) {
    return await query(sql.clearUnreadCnt, [id_self, id_group]);
}

async function addGroupMsgUnreadCnt(id_self, id_group) {
    return await query(sql.incrementUnreadCnt, [id_self, id_group]);
}

module.exports = {
    joinInGroup,
    getAllJoinedGroups,
    getAllGroupMembers,
    quitGroup,
    clearGroupMsgUnreadCnt,
    addGroupMsgUnreadCnt
};