const LController = requireRoot('common/LController');
const OfflineOrder = require('../@logic/Order');

module.exports = class OfflineOrderController extends LController {
    async query(){
        console.log(this.userInfo.roleName);
        const { page, pageSize, status = 1 } = this.request.body;
        const offlineOrder = new OfflineOrder();
        const list = await offlineOrder.query(status, { page, pageSize }); 
        this.renderJSON({code:0, list});
    }
    async detail(){
        const { id } = this.request.body;
        const offlineOrder = new OfflineOrder();
        const detail = await offlineOrder.detail(id);
        this.renderJSON({ code:0, detail });
    }
}