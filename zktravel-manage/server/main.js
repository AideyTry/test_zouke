
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
const opa = require('./opa');

app.keys = ['zktravel manage system', 'zktravel system'];

app.use(async (ctx, next) => {
    if(/\.(js|css|ico|png|jpg|jpeg)$/.test(ctx.path)){
        return
    }

    if(
        ctx.accepts(['html', 'image/*'])==='image/*'||                  // qr code
        ctx.path.startsWith('/trigger/')||                              // internal call
        ctx.headers['x-requested-with'] === 'XMLHttpRequest'||          // api ajax
        ctx.path==='/api/team/voucher/to-download'||                    // voucher download
        ctx.path==='/api/team/price/confirm-qr'||                       // confirm-qr
        (DEBUG&&ctx.path.startsWith('/test/'))
    ){
        await next();
    }else{
        await opa(ctx, next);
    }
});

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
        areas: [
            'trigger', 
            'api', 
            'api/team',         //团房
            'api/hotel',        //酒店
            'api/system',       //系统管理
            ... (DEBUG?['test']:[]) ]
    },
    sessionConfig: {
        key: SESS_KEY,
        maxAge: 86400000,
        dir: SESS_DIR
    }
}, app));

http.createServer(app.callback()).listen(PORT, '127.0.0.1');