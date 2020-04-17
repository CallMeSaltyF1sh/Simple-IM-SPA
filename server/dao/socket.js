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

async function create(id) {
    return await query(sql.insert, [id]);
}

async function get(id) {
    return await query(sql.get, [id]);
}

async function del(id) {
    return await query(sql.delete, [id]);
}

async function update(id, user) {
    return await query(sql.update, [user, id]);
}

module.exports = {
    create,
    get,
    del,
    update
};