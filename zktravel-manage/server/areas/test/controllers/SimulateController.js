const Controller = require('@local/koa-mvc/Controller');

const codeKey = '/api/auth/code';
const codeExpriesKey = '/api/auth/code-expries';

module.exports = class LoginController extends Controller {
    login(){
        const id = parseInt(this.query.id);
        this.session.uid = id;
        delete this.session[codeKey];
        delete this.session[codeExpriesKey];
        this.renderJSON({ code:0 });
    }
}