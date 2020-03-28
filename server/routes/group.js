const { create } = require('../service/group');

module.exports = {
    createGroup: async (ctx) => {
        const { name, userId } = ctx.data;
        const response = await create(name, userId);
        console.log(response);
        if(response.status === 0) {
            ctx.socket.socket.join(response.data.id);
        }
        return response;
    }
};