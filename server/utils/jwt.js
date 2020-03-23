const { secret } = require('../config/index');
const { sign } = require('jsonwebtoken');
//const jwt = require('koa-jwt');

function generateJWT(userId, email) {
    return sign({ userId, email }, secret, {
        expiresIn: '7d'
    });
}

module.exports = {
    generateJWT
}