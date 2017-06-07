const SController = require('./SController');
const User = requireRoot('service/user/User');

const $$userInfo = Symbol('');

module.exports = class LoginController extends SController {
    get userInfo(){
        return this[$$userInfo];
    }

    async $beforeAction(){
        const result = await super.$beforeAction();
        if(result===false) return false;

        if(this.ctx.headers['x-requested-with']!=='XMLHttpRequest') return false;

        const uid = this.session.uid;

        let userInfo = null;
        if(uid) userInfo = await User.get(uid);

        if(!userInfo){
            this.renderJSON({ code: -1, msg: 'not login' });
            return false; //pass
        }

        console.log('\tuid: ', uid);

        this[$$userInfo] = userInfo;
        const { access } = (this.$meta&&this.$meta()) || {};
        const action = this.route.action;
        if(!access) return;

        const actionAccess = access[action] || access.default;

        if(!actionAccess) return;
        
        for(let type of Object.keys(actionAccess)){
            if(!userInfo.checkPermission(type, actionAccess[type])){
                this.renderJSON({ code: -2, msg: 'access deny' })
                return false;
            }
        }
    }
}