const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO group_info(id, name, owner, created_at)
         VALUES (?, ?, ?, now())
    `,
    edit: `
        UPDATE group_info SET name=?, description=?
        WHERE id=?
    `,
    setAvatar: `
        UPDATE group_info SET avatar=?
        WHERE id=?
    `,
    get: `
        SELECT * FROM group_info WHERE id=?
    `,
    delete: `
        DELETE FROM group_info WHERE id=?
    `,
    changeOwner: `
        UPDATE group_info SET owner=?
        WHERE id=?
    `,
    getAllGroups: `
        SELECT * FROM group_link INNER JOIN group_info ON group_link.id_group = group_info.id 
        WHERE group_link.id_self = ?
    `,
    getDefaultGroup: `
        SELECT * FROM group_info WHERE is_default=true
    `
};

async function createGroup(id, name, owner) {
    return await query(sql.insert, [id, name, owner]);
}

async function editInfo(id, name, description) {
    return await query(sql.edit, [name, description, id]);
}

async function setAvatar(id, avatar) {
    return await query(sql.setAvatar, [avatar, id]);
}

async function getGroupInfo(id) {
    return await query(sql.get, [id]);
}

async function deleteGroup(id) {
    return await query(sql.delete, [id]);
}

async function changeOwner(id, newOwner) {
    return await query(sql.changeOwner, [newOwner, id]);
}

async function getJoinedGroupsByUserId(id) {
    return await query(sql.getAllGroups, [id]);
}

async function getDefaultGroup() {
    return await query(sql.getDefaultGroup, []);
}

module.exports = {
    createGroup,
    editInfo,
    setAvatar,
    getGroupInfo,
    deleteGroup,
    changeOwner,
    getJoinedGroupsByUserId,
    getDefaultGroup
};