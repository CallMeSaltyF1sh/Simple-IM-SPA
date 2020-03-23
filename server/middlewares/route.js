function noop() {}

module.exports = function(io, routes) {
    const router = Object.keys(routes).reduce((result, route) => {
        io.on(route, noop);
        result[route] = routes[route];
        return result;
    }, {});
    return async (ctx) => {
        if(router[ctx.event]) {
            const { event, data } = ctx;
            console.log(data);
            ctx.res = await router[ctx.event] ({
                event, 
                data
            });
        }
    }
}