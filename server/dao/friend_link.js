const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO friend_link(id_self, id_friend, created_at)
         VALUES (?, ?, now())
    `,
    getTime: `
        SELECT created_at FROM friend_link WHERE (id_self=? AND id_friend=?) OR (id_self=? AND id_friend=?)
    `,
    delete: `
        DELETE FROM group_link WHERE (id_self=? AND id_friend=?) OR (id_self=? AND id_friend=?)
    `,
    getAllFriends: `
        SELECT user.id, user.nickname, user.description, user.avatar, unread, remark FROM friend_link INNER JOIN user ON friend_link.id_friend = user.id 
        WHERE friend_link.id_self = ?
    `,
    incrementUnreadCnt: `
        UPDATE friend_link SET unread=unread+1
        where id_self=? and id_friend=?
    `,
    clearUnreadCnt: `
        UPDATE friend_link SET unread=0
        where id_self=? and id_friend=?
    `
};

async function becomeFriend(id_self, id_friend) {
    return await query(sql.insert, [id_self, id_friend]);
}

async function getAllFriends(id) {
    return await query(sql.getAllFriends, [id, id]);
}

async function getMakeFriendTime(id_self, id_friend) {
    return await query(sql.getTime, [id_self, id_friend, id_friend, id_self]);
}

async function deleteFriend(id_self, id_friend) {
    return await query(sql.delete, [id_self, id_friend, id_friend, id_self])
}

async function clearUserMsgUnreadCnt(id_self, id_friend) {
    return await query(sql.clearUnreadCnt, [id_self, id_friend]);
}

async function addUserMsgUnreadCnt(id_self, id_friend) {
    return await query(sql.incrementUnreadCnt, [id_self, id_friend]);
}

module.exports = {
    becomeFriend,
    getAllFriends,
    getMakeFriendTime,
    deleteFriend,
    clearUserMsgUnreadCnt,
    addUserMsgUnreadCnt
};