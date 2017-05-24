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
        return this.cookies.get(SESS_KEY);
    }
}