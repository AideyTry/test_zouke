const Controller = require('@local/koa-mvc/Controller');
const DES = require('@local/des');
const des = new DES('zouke7788');
const codeKey = '/api/auth/code';
const codeExpriesKey = '/api/auth/code-expries';

module.exports = class AuthController extends Controller {
    async login(){
        const { code, uid } = this.request.query;
        if(!code||!uid){
            this.renderJSON({code:1, msg:'need code and uid query string'})
            return;
        } 
        const sessionStore = this.ctx.sessionOptions.store;
        const sessionId = des.decrypt(code).split('/')[0];
        const session = sessionStore.get(sessionId);
        const now = new Date();

        if(session&&!session.uid&&session[codeKey]===code&&session[codeExpriesKey]>=now.valueOf()){
            session.uid = parseInt(uid)||uid;
            delete session[codeKey];
            delete session[codeExpriesKey];
            sessionStore.set(sessionId, session);
        }

        this.renderJSON({code: 0});
    }
}