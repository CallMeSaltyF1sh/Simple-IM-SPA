const assert = require('assert');
const { createMsg } = require('../service/message');

module.exports = {
    sendMsg: async (ctx) => {
        const { to, content, type, targetType } = ctx.data;
        assert(to, '接收方id不为空');

        const msg = await createMsg(to, content, type, targetType, ctx.socket.user);
        if(msg.content) {
            ctx.socket.socket.to(to).emit('message', msg);
        }
        console.log('get msg:', msg);
        return msg;
    },
    
    /*
    getMsg: async (ctx) => {
        const { userIds, groupIds } = ctx.data;
        const uPromises = userIds.map(id => {
            getUserMsg(ctx.socket.user, id);
        });
        const gPromises = groupIds.map(id => {
            getGroupMsg(id);
        });
    },
    */
   /*
    getMsgById: async (ctx) => {
        const { id, targetType } = ctx.data;
        assert(id, 'id不为空');
        let result;
        if(targetType === 'group') {
            result = await getGroupMsg(id);
        } else {
            result = await getUserMsg(ctx.socket.id, id);
        }
        console.log('msgRes:');
        console.log(result);
        return result;
    }
    */
};