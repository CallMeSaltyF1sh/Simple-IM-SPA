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

module.exports = {
    joinInGroup,
    getAllJoinedGroups,
    getAllGroupMembers,
    quitGroup
};