const BController = require('./BController');
const User = require('../service/user/User');

module.exports = class LController extends BController {
    /*
    async get userInfo(){
        if(!this._userInfo) this._userInfo = await User.get(this.session.userId);

        return this._userInfo;
    }

    async $beforeAction(){
        await super.$beforeAction();
        if(this.session.userId){
            const userInfo = await this.userInfo;
            if(userInfo) return //pass
        }

        this.renderJson({ code: -1, msg: 'not login' });
        return false;
    }
    */
}