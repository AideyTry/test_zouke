const LController = requireRoot('common/LController');
const Order = require('../@logic/Order');

module.exports = class MyPublishController extends LController {
    async query(){
        const { status = 1 } = this.request.body;
        const order = new Order();
        const uid = this.userInfo.id;
        const { list } = await order.query(status, { creatorId: uid, pageSize: 100 }); 
        this.renderJSON({code:0, list});
    }
}