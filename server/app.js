const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const helmet = require('koa-helmet');
const cors = require('koa-cors');
//const session = require('koa-session');
//const redis = require('redis');
//const client = redis.createClient(6379, '127.0.0.1');
//const { promisify } = require('util');
const IO = require('koa-socket');
const io = new IO({
    pingTimout: 10000,
    pingInterval: 5000
});
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');
const msgRoute = require('./routes/message');
const enhance = require('./middlewares/enhance');
const bindRoute = require('./middlewares/bindRoute');
const handle401 = require('./middlewares/401handler');
const errCatcher = require('./middlewares/errCatcher');
const { createSocket, deleteSocket } = require('./dao/socket');
const { server_port, secret } = require('./config/index');

const app = new Koa();

app.use(static(
    path.join(__dirname, './static'),
    {
        masxAge: 3600 * 24 * 15 * 1000,
        gzip: true
    }
))
  .use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors());

io.attach(app);
/*
io.use(async (ctx, next) => {
    await next();
    ctx.res={msg:'111'}
});
*/
io.use(enhance());
io.use(errCatcher());
io.use(handle401());
app.use(jwt({
    secret
}).unless({
    path: [/\/login/, /\/register/, "/", /\checkToken/, /\guest/]
}));

io.use(bindRoute(
    app.io,
    { ...userRoute, ...groupRoute, ...msgRoute }
));

app.io.on('connection', async (ctx)=>{
    console.log('connection', ctx.socket.id);
    await createSocket(ctx.socket.id);
});
app.io.on('disconnect', async (ctx) => {
    console.log('disconnect', ctx.socket.id);
    await deleteSocket(ctx.socket.id);
});
/*
app.keys = ['nancy'];
const hgetallAsync = promisify(client.hgetall).bind(client);
const store = {
    get: async (key, maxAge) => {
        return await hgetallAsync(key);
    },
    set: (key, sess, maxAge) => {
        client.hmset(key, sess);
    },
    destroy: key => {
        client.hdel(key);
    }
};
const config = {
    maxAge: 3600 * 24 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    store
};
app.use(session(config, app));
app.use(ctx => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + 'views';
});
*/

app.listen(server_port, () => {
    console.log(`koa is running at port ${server_port}`);
});