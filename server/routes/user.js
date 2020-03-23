const register = require('../service/register');
const { login, loginWithToken } = require('../service/login');

module.exports = {
    register: async (ctx) => {
        console.log('response', ctx);
        const { email, nickname, password } = ctx.data;
        const response = await register(email, nickname, password);
        return response;
    },
    login: async (ctx) => {
        console.log('response', ctx);
        const { email, password } = ctx.data;
        const response = await login(email, password);
        return response;
    },
    checkToken: async (ctx) => {
        console.log('response', ctx);
        const { token } = ctx.data;
        const response = await loginWithToken(token);
        return response;
    }
}