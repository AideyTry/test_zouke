const Controller = require('@local/koa-mvc/Controller');
const DES = require('@local/des');
const des = new DES('zouke7788');
const sessionStore = requireRoot('middleware/sessionStore');

module.exports = class AuthController extends Controller {
    async login(){
        const { code, uid } = this.request.query;
        const key = des.decrypt(code);

        const sessionId = key.split('/')[0];
        const session = sessionStore.get(sessionId);
        if(session){
            session.uid = uid;
            sessionStore.set(sessionId, session);
        }
    }
}