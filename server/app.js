const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
//const { sign } = require('jsonwebtoken');
//const jwt = require('koa-jwt');
const helmet = require('koa-helmet');
const cors = require('koa-cors');
const session = require('koa-session');
const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
const { promisify } = require('util');
const IO = require('koa-socket');
const io = new IO({
    pingTimout: 10000,
    pingInterval: 5000
});

const enhance = require('./middlewares/enhance');
const bindRoute = require('./middlewares/route');
const route = require('./routes/test');

const { server_port, secret } = require('./config/index');

const app = new Koa();
io.attach(app);


io.use(async (ctx, next) => {
    await next();
    ctx.res={msg:'111'}
});

io.use(enhance());
io.use(bindRoute(
    app.io,
    { ...route }
));

app.io.on('connection', async (ctx)=>{
    console.log('connection', ctx.socket.id);
});
app.io.on('disconnect', async (ctx) => {
    console.log('disconnect', ctx.socket.id);
});

app.use(static(
    path.join(__dirname, './static'),
    {
        masxAge: 3600 * 24 * 15 * 1000,
        gzip: true
    }
));

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
*/
/*
app.use(ctx => {
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + 'views';
});
*/
/*
app.use(jwt({
    secret
}).unless({
    path: [/\/login/, /\/register/]
}))
*/


/*
app.use(logger())
  .use(bodyParser())
  .use(helmet())
  .use(cors());
*/


app.listen(server_port, () => {
    console.log(`koa is running at port ${server_port}`);
});