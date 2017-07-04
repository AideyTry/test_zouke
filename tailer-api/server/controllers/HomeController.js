const Controller = require('@local/koa-mvc/Controller');

module.exports = class HomeController extends Controller {
    // @POST
    index(id){
        this.renderJSON({ code:0, id })
    }
}