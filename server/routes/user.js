const register = require('../service/register');
const { login, loginWithToken } = require('../service/login');
const { getDefaultGroupInfo } = require('../service/group');

module.exports = {
    register: async (ctx) => {
        console.log('response', ctx);
        const { email, nickname, password } = ctx.data;
        const response = await register(email, nickname, password);
        console.log('register：')
        console.log(response)
        return response;
    },
    login: async (ctx) => {
        console.log('response', ctx);
        const { email, password } = ctx.data;
        const response = await login(email, password, ctx.socket.id);
        if(response.data) {
            const { groups = [], userInfo = {}, friends = [] } = response.data;
            groups.forEach(group => {
                ctx.socket.socket.join(group.id);
            });
            /*
            friends.forEach(friend => {
                ctx.socket.socket.join(friend.id);
            });
            */
            ctx.socket.socket.join(userInfo.id);
            ctx.socket.user = userInfo.id;
        }
        console.log('login：')
        console.log(response)
        return response;
    },
    checkToken: async (ctx) => {
        console.log('response', ctx);
        const { token } = ctx.data;
        const response = await loginWithToken(token, ctx.socket.id);
        if(response.data) {
            const { groups = [], userInfo = {}, friends = [] } = response.data;
            groups.forEach(group => {
                ctx.socket.socket.join(group.id);
            });
            /*
            friends.forEach(friend => {
                ctx.socket.socket.join(friend.id);
            });
            */
            console.log('socket.socket')
            console.log(ctx.socket.socket)
            ctx.socket.socket.join(userInfo.id);
            ctx.socket.user = userInfo.id;
        }
        return response;
    },
    guest: async (ctx) => {
        const response = await getDefaultGroupInfo();
        if(response.status === 0) {
            ctx.socket.socket.join(response.data.id);
        }
        return response;
    }
}