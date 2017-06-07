const LController = requireRoot('common/LController');
const OfflineOrder = require('../logic/OfflineOrder');

module.exports = class OfflineOrderController extends LController {
    async query(){
        const { status = 1 } = this.request.body;
        const offlineOrder = new OfflineOrder();
        const uid = this.userInfo.id;
        const list = await offlineOrder.query(status, uid); 
        this.renderJSON({code:0, list});
    }
    async detail(){
        const { id } = this.request.body;
        const offlineOrder = new OfflineOrder();
        const detail = await offlineOrder.detail(id);
        this.renderJSON({ code:0, detail });
    }
}