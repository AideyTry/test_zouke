const Controller = require('@local/koa-mvc/Controller');
const { SESS_KEY } = requireRoot('env');
const qrcode = require('qrcode');
const http = require('http');

const logResponse = Symbol();

module.exports = class SessionController extends Controller{
    logResponse(){
        this[logResponse] = true;
    }
    $beforeAction(){
        if(this.isAjax()){
            console.log('\trequest data', JSON.stringify(this.request.body));
        }
    }
    $afterAction(){
        if(this.isAjax()&&this[logResponse]===true){
            console.log('\tresponse data', this.response.body);
        }
    }

    renderQR(url){
        return new Promise((r,j)=>{
            qrcode.toString(
                url,
                {
                    type: 'svg'
                },
                (err, string)=>{
                    if(err) j(err);
                    else{
                        this.renderSVG(string);
                        r();
                    }
                }
            );
        });
    }

    renderRemote({ path='/', host='localhost', port=80, method="GET", headers={}, data }={}){
        return new Promise((r,j)=>{
            const client = http.request({
                host,
                path,
                port,
                method,
                headers
            }, res=>{
                this.renderStream(res);
                this.response.set('content-type', res.headers['content-type']);
                if(res.headers['content-disposition']) 
                    this.response.set('content-disposition', res.headers['content-disposition'])
                r();
            }).on('error', e=>{
                j(e);
            });

            if(data) client.write(JSON.stringify(data));
            client.end();
        })
    }
}