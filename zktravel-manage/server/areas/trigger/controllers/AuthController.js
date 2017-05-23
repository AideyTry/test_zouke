const Controller = require('@local/koa-mvc/Controller');
const DES = require('@local/des');
const des = new DES('zouke7788');
const sessionStore = requireRoot('middleware/sessionStore');
const codeKey = '/api/auth/code';
const codeExpriesKey = '/api/auth/code-expries';

module.exports = class AuthController extends Controller {
    async login(){
        const { code, uid } = this.request.query;
        const sessionId = des.decrypt(code).split('/')[0];
        const session = sessionStore.get(sessionId);
        const now = new Date();

        if(session&&session[codeKey]===code&&session[codeExpriesKey]>=now.valueOf()){
            session.uid = parseInt(uid)||uid;
            delete session[codeKey];
            delete session[codeExpriesKey];
            sessionStore.set(sessionId, session);
        }
    }
}