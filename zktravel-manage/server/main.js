
const { DEBUG } = require('../../config');
if(!DEBUG){
    process.env.NODE_ENV = 'production';
}

const Koa = require('koa');

const koaMvc = require('@local/koa-mvc')();
const opa = require('./middleware/opa');

const app = new Koa();

app.use(async (ctx, next) => {
    if(ctx.headers['x-requested-with'] === 'XMLHttpRequest'){
        koaMvc(ctx, next);
    }else{
        opa(ctx, next);
    }
});

app.listen(8081);