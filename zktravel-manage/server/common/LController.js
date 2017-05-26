const SController = require('./SController');
const User = requireRoot('service/user/User');

module.exports = class LoginController extends SController {
    get userInfo(){
        if(this._userInfo) return this._userInfo;

        const uid = this.session.uid;
        if(uid) return User.get(uid);
        else return null;
    }

    async $beforeAction(){
        const result = await super.$beforeAction();
        if(result===false) return false;

        if(this.ctx.headers['x-requested-with']!=='XMLHttpRequest') return false;

        const userInfo = await this.userInfo;
        if(!userInfo){
            this.renderJSON({ code: -1, msg: 'not login' });
            return false; //pass
        }
    }   
}