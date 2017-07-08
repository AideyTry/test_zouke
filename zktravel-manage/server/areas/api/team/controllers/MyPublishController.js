const TeamController = require('../TeamController');
const Order = require('../@logic/Order');

module.exports = class PublishController extends TeamController {
    async query(status=1){
        const order = new Order();
        const uid = this.userInfo.id;
        const { list } = await order.query(status, { creatorId: uid, pageSize: 100 });

        this.renderJSON({code:0, list});
    }
}