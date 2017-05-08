const Controller = require('@local/koa-mvc/Controller');

module.exports = class HomeController extends Controller{
    index(){
        this.renderJson({});
    }
}