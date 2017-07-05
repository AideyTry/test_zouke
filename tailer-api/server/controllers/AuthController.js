const Controller = require('@local/koa-mvc/Controller');

module.exports = class HomeController extends Controller {
    // @POST
    login(id){
        this.renderJSON({ code:0, id })
    }
}