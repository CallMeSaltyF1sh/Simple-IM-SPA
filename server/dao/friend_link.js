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
        SELECT user.id, user.nickname, user.description, user.avatar FROM friend_link INNER JOIN user ON friend_link.id_friend = user.id 
        WHERE friend_link.id_self = ?
        UNION SELECT user.id, user.nickname, user.description, user.avatar FROM friend_link INNER JOIN user ON friend_link.id_self = user.id 
        WHERE friend_link.id_friend = ?
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

module.exports = {
    becomeFriend,
    getAllFriends,
    getMakeFriendTime,
    deleteFriend
};