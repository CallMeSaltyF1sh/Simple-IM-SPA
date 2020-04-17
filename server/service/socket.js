const { create, del, update } = require('../dao/socket');

async function createSocket(id) {
    try {
        await create(id);
    } catch(e) {
        console.log(e);
    }
}

async function deleteSocket(id) {
    try {
        await del(id);
    } catch(e) {
        console.log(e);
    }
}

async function updateSocket(id, id_user) {
    try {
        await update(id, id_user);
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    createSocket,
    deleteSocket,
    updateSocket
}