
const { DEBUG, SESS_KEY, PORT, SESS_DIR } = require('./env');
if(!DEBUG){
    process.env.NODE_ENV = 'production';
}

require('./requireRoot');
require('@local/common/core/w/prototype');

const http = require('http');
const Koa = require('koa');
const app = new Koa();

const koaMvc = require('@local/koa-mvc');

app.keys = ['zktravel', 'zktravel web'];

app.use(async (ctx, next)=>{
    console.log(`--> request ${ctx.originalUrl} start`);
    try{
        await next();
    }catch(e){
        throw e;
    }finally{
        console.log(`<-- request ${ctx.originalUrl} end`);
    }
});
app.use(koaMvc({
    routerConfig: {
    },
    sessionConfig: {
        key: SESS_KEY,
        maxAge: 7200000,
        dir: SESS_DIR,
        keyStore: {
            get(ctx){
                return ctx.request.body&&ctx.request.body.token;
            },
            set(){},
            destroy(){}
        }
    }
}, app));

http.createServer(app.callback()).listen(PORT, '127.0.0.1');