const LController = requireRoot('common/LController');
const OfflineOrder = require('../logic/OfflineOrder');

module.exports = class MyOfflineOrderController extends LController {
    async query(){
        const { status = 1 } = this.request.body;
        const offlineOrder = new OfflineOrder();
        const uid = this.userInfo.id;
        const list = await offlineOrder.query(status, { creatorId: uid, pageSize: 100 }); 
        this.renderJSON({code:0, list});
    }
}