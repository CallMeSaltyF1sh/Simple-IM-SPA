const register = require('../service/register');
const { login, loginWithToken } = require('../service/login');
const { getDefaultGroupInfo } = require('../service/group');
const { updateSocket } = require('../service/socket');

module.exports = {
    register: async (ctx) => {
        const { email, nickname, password } = ctx.data;
        const response = await register(email, nickname, password);
        console.log('register：')
        console.log(response)
        return response;
    },
    login: async (ctx) => {
        const { email, password } = ctx.data;
        const response = await login(email, password, ctx.socket.id);
        if(response.data) {
            const { groups = [], userInfo = {} } = response.data;
            groups.forEach(group => {
                ctx.socket.socket.join(group.id);
            });
            ctx.socket.socket.join(userInfo.id);
            ctx.socket.user = userInfo.id;
        }
        console.log('login：')
        console.log(response)
        return response;
    },
    checkToken: async (ctx) => {
        const { token } = ctx.data;
        const response = await loginWithToken(token, ctx.socket.id);
        if(response.data) {
            const { groups = [], userInfo = {} } = response.data;
            groups.forEach(group => {
                ctx.socket.socket.join(group.id);
            });
            ctx.socket.socket.join(userInfo.id);
            ctx.socket.user = userInfo.id;
            
            //console.log('rooms:');
            //console.log(ctx.socket.socket.rooms);
        }
        return response;
    },
    guest: async (ctx) => {
        let rooms = Object.keys(ctx.socket.socket.rooms);
        rooms = rooms ? rooms : [];
        rooms.forEach(room => {
            ctx.socket.socket.leave(room);
        });
        ctx.socket.user = '';
        await updateSocket(ctx.socket.id, null);
        const response = await getDefaultGroupInfo();
        if(response.status === 0) {
            ctx.socket.socket.join(response.data.id);
        }
        return response;
    }
}