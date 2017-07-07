const Controller = require('@local/koa-mvc/Controller');
const Auth = require('../@logic/Auth');

module.exports = class AuthController extends Controller {
    // @POST
    async login(code, rawData, signature, encryptedData, iv){
        const auth = new Auth();
        const sessionData = await auth.getSessionKey(code);

        if(!sessionData) 
            return this.renderJSON({ code:1, msg:'get session_key response error' });
        if(sessionData.errcode) 
            return this.renderJSON({ code:1, msg:sessionData.errmsg });

        if(!auth.validSign(rawData, sessionData.session_key, signature)) 
            return this.renderJSON({ code:1, msg:'invalid signature' });
        
        const userInfo = auth.decryptData(sessionData.session_key,encryptedData,iv);

        await auth.updateUser(userInfo);
        this.session = userInfo;

        this.renderJSON({ code:0, token: this.sessionId });
    }

    // @POST
    async isLogin(){
        if(this.session.openId) this.renderJSON({ code:0, login: true });
        else this.renderJSON({ code:0, login: false });
    }
}