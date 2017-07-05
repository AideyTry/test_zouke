const Controller = require('@local/koa-mvc/Controller');

module.exports = class LoginController extends Controller {
    async $beforeAction(){
        const result = await super.$beforeAction();
        if(result===false) return false;

        if(this.request.method.toUpperCase()!=='POST'){
            this.throw(404); //not found
            return false;
        }

        if(!this.session.uid){
            this.renderJSON({ code: -1, msg: 'not login' });
            return false;
        }
    }
}