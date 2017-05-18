
const { DEBUG } = require('../../config');
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

const app = new Koa();
app.keys = ['zktravel manage system', 'zktravel system'];

app.use(session({
    key: 'sess',
    maxAge: 86400000
},app))

app.use(async (ctx, next) => {
    if(ctx.path.startsWith('/trigger/')||ctx.headers['x-requested-with'] === 'XMLHttpRequest'){
        console.log(`request ${ctx.originalUrl} start`);
        await koaMvc(ctx, next);
        console.log(`request ${ctx.originalUrl} end`);
    }else{
        opa(ctx, next);
    }
});

app.listen(8081);