const Controller = require('@local/koa-mvc/Controller');

module.exports = class SessionController extends Controller{
    get session(){
        return this.ctx.session;
    }
}