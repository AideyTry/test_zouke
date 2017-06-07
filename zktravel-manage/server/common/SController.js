const Controller = require('@local/koa-mvc/Controller');
const { SESS_KEY } = requireRoot('env');

const logResponse = Symbol();

module.exports = class SessionController extends Controller{
    logResponse(){
        this[logResponse] = true;
    }
    $beforeAction(){
        if(this.isAjax()){
            console.log('\trequest data', this.request.body);
        }
    }
    $afterAction(){
        if(this.isAjax()&&this[logResponse]===true){
            console.log('\tresponse data', this.response.body);
        }
    }
}