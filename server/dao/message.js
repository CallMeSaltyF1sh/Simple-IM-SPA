const query = require('../utils/query');

const sql = {
    insertUsrMsg: `
        INSERT INTO message(from, to_user, content, type, created_at)
         VALUES (?, ?, ?, ?, now())
    `,
    insertGroupMsg: `
        INSERT INTO message(from, to_group, content, type, created_at)
         VALUES (?, ?, ?, ?, now())
    `,
    getMsgByGroupId: `
        SELECT * FROM message WHERE to_group=? ORDER BY created_at
    `,
    getMsgByUserId: `
        SELECT * FROM message WHERE (from=? AND to_user=?) OR (from=? AND to_user=?)
        ORDER BY created_at
    `
};

async function insertGroupMsg(id, id_group, type) {
    return await query(sql.insertGroupMsg, [id, id_group, type]);
}

async function insertUsrMsg(id, id_usr, type) {
    return await query(sql.insertUsrMsg, [id, id_usr, type]);
}

async function getGroupMsg(id_group) {
    return await query(sql.getGroupMsg, [id_group]);
}

async function getUserMsg(id, id_usr) {
    return await query(sql.getUserMsg, [id, id_usr, id_usr, id]);
}

module.exports = {
    insertGroupMsg, 
    insertUsrMsg,
    getGroupMsg,
    getUserMsg
};