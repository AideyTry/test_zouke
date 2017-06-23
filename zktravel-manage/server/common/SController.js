const Controller = require('@local/koa-mvc/Controller');
const { SESS_KEY } = requireRoot('env');
const qrcode = require('qrcode');

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
}