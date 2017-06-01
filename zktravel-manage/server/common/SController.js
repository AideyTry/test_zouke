const Controller = require('@local/koa-mvc/Controller');
const { SESS_KEY } = requireRoot('env');

const logResponse = Symbol();

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
    logResponse(){
        this[logResponse] = true;
    }
    $beforeAction(){
        if(this.isAjax()){
            console.log('\trequest data', this.request.body);
        }
    }
    $afterAction(){
        if(this.isAjax()&&this[logResponse]===true){
            console.log('\tresponse data', this.response.body);
        }
    }
}