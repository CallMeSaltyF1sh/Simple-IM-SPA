const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO group(id, name, owner, created_at)
         VALUES (?, ?, ?, now())
    `,
    edit: `
        UPDATE group SET name=?, description=?
        where id=?
    `,
    setAvatar: `
        UPDATE group SET avatar=?
        where id=?
    `,
    get: `
        SELECT * FROM group WHERE id=?
    `,
    delete: `
        DELETE FROM group WHERE id=?
    `,
    changeOwner: `
        UPDATE group SET owner=?
        where id=?
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

module.exports = {
    createGroup,
    editInfo,
    setAvatar,
    getGroupInfo,
    deleteGroup,
    changeOwner
};