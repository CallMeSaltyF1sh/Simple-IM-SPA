const register = require('../service/register');
const { login, loginWithToken } = require('../service/login');

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
            const { groups = [], userInfo = {} } = response.data;
            groups.forEach(group => {
                ctx.socket.socket.join(group.id);
            });
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
            const { groups = [], userInfo = {} } = response.data;
            groups.forEach(group => {
                ctx.socket.socket.join(group.id);
            });
            ctx.socket.user = userInfo.id;
        }
        return response;
    }
}