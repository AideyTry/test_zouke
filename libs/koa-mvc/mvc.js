
const Router = require('./Router');
const ActionTrigger = require('./ActionTrigger');
const NotFoundError = require('./NotFoundError');


module.exports = function(routerConfig){
    
    const router = new Router(routerConfig);

    return async (ctx, next) => {
        const route = router.match(ctx.path);

        const actionTrigger = new ActionTrigger({
            ctx, route, router
        });
        try{
            await actionTrigger.trigger();
        }catch(e){
            if(e instanceof NotFoundError) ctx.throw(404)
            //nodejs fs can't read file
            else if(e.code==='ENOENT') ctx.throw(500, 'koa-mvc controller.render can\'t found pug view file!')
            else throw e;
        }
    }
}