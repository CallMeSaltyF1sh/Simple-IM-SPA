const assert = require('assert');
const { createMsg, getHistoryMsgs, clearUnreadCnt } = require('../service/message');

module.exports = {
    sendMsg: async (ctx) => {
        const { to, content, type, targetType } = ctx.data;
        assert(to, '接收方id不为空');

        const msg = await createMsg(to, content, type, targetType, ctx.socket.user);
        if(msg.content) {
            ctx.socket.socket.to(to).emit('message', msg);
        }
        return msg;
    },
    getMoreMsg: async (ctx) => {
        const { id_group, id_friend, time } = ctx.data;
        const res = await getHistoryMsgs(id_group, ctx.socket.user, id_friend, time);
        return res;
    },
    clearUnread: async (ctx) => {
        const { targetType, targetId } = ctx.data;
        const res = await clearUnreadCnt(targetType, targetId, ctx.socket.user);
        return res;
    }
};