const assert = require('assert');
const { sendGroupMsg, sendUserMsg, getGroupMsg, getUserMsg } = require('../dao/message');
const { getById } = require('../dao/user');
const { getGroupInfo } = require('../dao/group_info');

module.exports = {
    sendMsg: async (ctx) => {
        const { to, content, type, targetType } = ctx.data;
        assert(to, '接收方id不为空');

        if(targetType === 'group') {
            const group = await getGroupInfo(to);
            assert(group, '群组不存在');
            try {
                await sendGroupMsg(ctx.socket.user, to, content, type);
            } catch(e) {
                console.log(e);
            }
        } else {
            const user = await getById(to);
            assert(user, '用户不存在');
            try {
                await sendUserMsg(ctx.socket.user, to, content, type);
            } catch(e) {
                console.log(e);
            }
        }
        //构造消息发给接收方
        const from = await getById(ctx.socket.user);
        const msg = { from: from[0], to, content, type };
        ctx.socket.socket.to(to).emit('message', msg);

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
};