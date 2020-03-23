const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO socket(id, created_at)
         VALUES (?, now())
    `,
    update: `
        UPDATE socket SET user=?
        WHERE id=?
    `,
    get:`
        SELECT * FROM socket WHERE id=?
    `,
    delete: `
        DELETE FROM socket WHERE id=?
    `
};

async function createSocket(id) {
    return await query(sql.insert, [id]);
}

async function getSocket(id) {
    return await query(sql.get, [id]);
}

async function deleteSocket(id) {
    return await query(sql.delete, [id]);
}

async function updateSocket(id, user) {
    return await query(sql.update, [user, id]);
}

module.exports = {
    createSocket,
    getSocket,
    deleteSocket,
    updateSocket
};