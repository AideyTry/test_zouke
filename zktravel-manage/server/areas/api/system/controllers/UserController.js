const LController = requireRoot('common/LController');
const SystemUser = require('../@logic/User');

module.exports = class UserController extends LController{
    $meta(){
        return {
            access: {
                default: {
                    'offline_order': this.P.OFFLINE_ORDER.DISPATCH
                }
            }
        }
    }
    async list(role){
        const systemUser = new SystemUser();
        const list = await systemUser.list(role);
        this.renderJSON({code:0, list});
    }
}