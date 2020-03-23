module.exports = function() {
    return async (ctx, next) => {
        return next().catch(err => {
            if(err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    error: 'not allowed/(ToT)/~~'
                };
            } else {
                throw err;
            }
        });
    };
};