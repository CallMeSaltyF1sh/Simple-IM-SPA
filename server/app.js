const Koa = require('koa');
const path = require('path');
const mysql = require('mysql');
//const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const logger = require('koa-logger');
const session = require('koa-session-minimal');
//const MysqlStore = require('koa-mysql-session');
const { sign } = require('jsonwebtoken');
const jwt = require('koa-jwt');
const helmet = require('koa-helmet');
const cors = require('koa-cors');

const { server_port, secret } = require('./config');

const app = new Koa();

app.use(jwt({
    secret
}).unless({
    path: [/\/login/, /\/register/]
}))
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors());

app.listen(server_port, () => {
    console.log(`koa is running at port ${server_port}`);
});