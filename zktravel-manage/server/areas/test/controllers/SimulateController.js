const Controller = require('@local/koa-mvc/Controller');

module.exports = class LoginController extends Controller {
    login(){
        const id = parseInt(this.query.id);
        this.session.uid = id;
        this.renderJSON({ code:0 });
    }
}