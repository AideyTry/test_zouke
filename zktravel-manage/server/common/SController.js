const Controller = require('@local/koa-mvc/Controller');
const { SESS_KEY } = requireRoot('env');

module.exports = class SessionController extends Controller{
    get session(){
        return this.ctx.session;
    }
    set session(s){
        this.ctx.session = s;
    }
    get sessionId(){
        return this.ctx.sessionId;
    }
    $beforeAction(){
        if(this.isAjax()){
            console.log('\trequest data', this.request.body);
        }
    }
    $afterAction(){
        if(this.isAjax()){
            console.log('\tresponse data', this.response.body);
        }
    }
}