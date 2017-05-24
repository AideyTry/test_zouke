
const { DEBUG, SESS_KEY } = require('./env');
if(!DEBUG){
    process.env.NODE_ENV = 'production';
}

require('./requireRoot');
require('@local/common/core/w/prototype');

const Koa = require('koa');

const koaMvc = require('@local/koa-mvc')({
    areas: ['trigger', 'api']
});
const opa = require('./middleware/opa');
const session = require('./middleware/session');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
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

app.use(session({
    key: SESS_KEY,
    maxAge: 86400000
}, app))

app.use(bodyParser());
app.use(async (ctx, next)=>{
    console.log(`request ${ctx.originalUrl} start`);
    await koaMvc(ctx, next);
    console.log(`request ${ctx.originalUrl} end`);
});

app.listen(8081);