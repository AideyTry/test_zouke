
const { DEBUG, SESS_KEY, PORT, SESS_DIR } = require('./env');
if(!DEBUG){
    process.env.NODE_ENV = 'production';
}

require('./requireRoot');
require('@local/common/core/w/prototype');

const Koa = require('koa');
const app = new Koa();

const koaMvc = require('@local/koa-mvc');
const opa = require('./opa');

app.keys = ['zktravel manage system', 'zktravel system'];

app.use(async (ctx, next) => {
    if(/\.(js|css|ico|png|jpg|jpeg)$/.test(ctx.path)){
        return
    }

    if(ctx.accepts(['html', 'image/*'])==='image/*'||ctx.path.startsWith('/trigger/')||ctx.headers['x-requested-with'] === 'XMLHttpRequest'){
        await next();
    }else{
        await opa(ctx, next);
    }
});

app.use(async (ctx, next)=>{
    console.log(`request ${ctx.originalUrl} start`);
    await next();
    console.log(`request ${ctx.originalUrl} end`);
})
app.use(koaMvc({
    routerConfig: {
        areas: ['trigger', 'api']
    },
    sessionConfig: {
        key: SESS_KEY,
        maxAge: DEBUG ? 86400000*30 : 86400000,
        dir: SESS_DIR
    }
}, app));

app.listen(PORT);