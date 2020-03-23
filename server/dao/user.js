const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO user(id, nickname) VALUES (?, ?)
    `,
    updateInfo: `
        UPDATE user SET nickname=?, description=?
        where id=?
    `,
    updateAvatar: `
        UPDATE user SET avatar=?
        WHERE id=?
    `,
    get: `
        SELECT * FROM user WHERE id=?
    `,
    delete: `
        DELETE FROM user WHERE id=?
    `
};

async function getById(id) {
    return await query(sql.get, [id]);
}

async function deleteById(id) {
    return await query(sql.delete, [id]);
}

async function createInfo(id, nickname) {
    return await query(sql.insert, [id, nickname]);
}

async function updateInfo(id, nickname, description) {
    return await query(sql.updateInfo, [nickname, description, id]);
}

async function updateAvatar(id, avatar) {
    return await query(sql.updateAvatar, [avatar, id]);
}

module.exports = {
    getById,
    deleteById,
    createInfo,
    updateAvatar,
    updateInfo
};