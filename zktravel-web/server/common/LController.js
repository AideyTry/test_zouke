const WController = require('./WController');

module.exports = class LoginController extends WController {
    async $beforeAction(){
        const superResult = super.$beforeAction();
        if(superResult===false) return false;

        const uid = await this.$getUid();
        if(!uid){
            this.render(null, '/views/login');
            return false;
        }
    }
}