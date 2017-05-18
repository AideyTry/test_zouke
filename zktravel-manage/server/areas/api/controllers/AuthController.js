const BController = requireRoot('common/BController');

module.exports = class AuthController extends BController{
    async isLogin(){
        if(this.session.userId){
            this.renderJson({
                code: 0, 
            })
        } else {
            this.renderJson({
                code: 1,
                msg: 'not login'
            })
        }
    }

    async login(){
        console.log(this.request.body);
    }

    async logout(){

    }

    async register(){

    }
}