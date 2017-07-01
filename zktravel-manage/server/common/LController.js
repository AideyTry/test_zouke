const SController = require('./SController');
const User = requireRoot('service/user/User');

const $$userInfo = Symbol('userInfo');
const $$checkPermission = Symbol('checkPermission');

module.exports = class LoginController extends SController {
    get userInfo(){
        return this[$$userInfo];
    }
    get P(){
        return this.userInfo.PERMISSION;
    }

    [$$checkPermission](type, pValue){
        if(!Array.isArray(pValue)){
            pValue = [pValue];
        }
        for(let p of pValue){
            if(!this.userInfo.checkPermission(type,p)){
                return false;
            }
        }
        return true;
    }

    async $beforeAction(){
        const result = await super.$beforeAction();
        if(result===false) return false;

        if(this.isRewrite()&&this.rewriteController[$$userInfo]){
            this[$$userInfo] = this.rewriteController[$$userInfo];
        }else{
            const uid = this.session.uid;

            let userInfo = null;
            if(uid) userInfo = await User.get(uid);

            if(!userInfo){
                this.renderJSON({ code: -1, msg: 'not login' });
                return false; //pass
            }

            console.log('\tuid: ', uid);

            this[$$userInfo] = userInfo;
        }

        const { access } = (this.$meta&&this.$meta()) || {};
        const action = this.route.action;
        if(!access) return;

        const actionAccess = access[action] || access.default;

        if(!actionAccess) return;
        
        for(let type of Object.keys(actionAccess)){
            if(!this[$$checkPermission](type, actionAccess[type])){
                this.renderJSON({ code: -2, msg: 'access deny' })
                return false;
            }
        }
    }
}