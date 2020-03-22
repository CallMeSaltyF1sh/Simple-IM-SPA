const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO socket(id, user, created_at)
         VALUES (?, ?, now())
    `,
    get:`
        SELECT * FROM socket WHERE id=?
    `,
    delete: `
        DELETE FROM socket WHERE id=?
    `
};

async function createSocket(id, user) {
    return await query(sql.insert, [id, user]);
}

async function getSocket(id) {
    return await query(sql.get, [id]);
}

async function deleteSocket(id) {
    return await query(sql.delete, [id]);
}

module.exports = {
    createSocket,
    getSocket,
    deleteSocket
};