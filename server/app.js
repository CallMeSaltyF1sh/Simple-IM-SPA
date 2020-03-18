const Koa = require('koa');
const path = require('path');
const mysql = require('mysql');
//const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const { database_config, server_port } = require('./config');

const app = new Koa();

const pool = mysql.createPool(database_config);

app.listen(server_port, () => {
    console.log(`koa is running at port ${server_port}`);
});