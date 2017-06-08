const LController = requireRoot('common/LController');
const SystemUser = require('../logic/SystemUser');

module.exports = class SystemUserController extends LController{
    $meta(){
        return {
            access: {
                default: {
                    'offline_order': this.userInfo.PERMISSION.OFFLINE_ORDER.DISPATCH
                }
            }
        }
    }
    async list(){
        const systemUser = new SystemUser();
        const { role } = this.request.body;
        const list = await systemUser.list(role);
        this.renderJSON({code:0, list});
    }
}