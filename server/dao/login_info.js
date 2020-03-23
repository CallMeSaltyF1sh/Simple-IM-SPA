const query = require('../utils/query');

const sql = {
    insert: `
        INSERT INTO login_info(id, email, password, created_at)
         VALUES (?, ?, ?, now())
    `,
    setAdmin: `
        UPDATE login_info SET is_admin=?
        where id=?
    `,
    updateEmail: `
        UPDATE login_info SET email=?
        where id=?
    `,
    updatePassword: `
        UPDATE login_info SET password=?
        where id=?
    `,
    getByEmail: `
        SELECT * FROM login_info WHERE email=?
    `,
    getById: `
        SELECT * FROM login_info WHERE id=?
    `,
    delete: `
        DELETE FROM login_info WHERE id=?
    `,
    updateLoginTime: `
        UPDATE login_info SET last_login=now() where email=?
    `
};

async function create(id, email, password) {
    return await query(sql.insert, [id, email, password]);
}

async function setAdmin(id, bool) {
    return await query(sql.setAdmin, [bool, id]);
}

async function updateEmail(id, email) {
    return await query(sql.updateEmail, [email, id]);
}

async function updatePassword(id, password) {
    return await query(sql.updatePassword, [password, id]);
}

async function getById(id) {
    return await query(sql.getById, [id]);
}

async function getByEmail(email) {
    return await query(sql.getByEmail, [email]);
}

async function updateLoginTime(email) {
    return await query(sql.updateLoginTime, [email]);
}

module.exports = {
    create,
    setAdmin,
    updateEmail,
    updatePassword,
    getById,
    getByEmail,
    updateLoginTime
};