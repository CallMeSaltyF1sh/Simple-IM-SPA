module.exports = function() {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.res = `Server error: ${err.message}`;
            console.log('Error occured...');
        }
    };
};