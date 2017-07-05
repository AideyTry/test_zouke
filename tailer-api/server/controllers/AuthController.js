const Controller = require('@local/koa-mvc/Controller');
const Auth = require('../Auth');

module.exports = class AuthController extends Controller {
    // @POST
    async login(code, rawData, signature, encryptedData, iv){
        const auth = new Auth();
        const sessionData = await auth.getSessionKey(code);
        //todo
    }

    // @POST
    async isLogin(){
        if(this.session.uid) this.renderJSON({ code:0, login: true });
        else this.renderJSON({ code:0, login: false });
    }
}