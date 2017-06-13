const LController = requireRoot('common/LController');
const Order = require('../@logic/Order');

module.exports = class OrderController extends LController {
    async query(){
        const { page, pageSize, status = 1 } = this.request.body;
        const order = new Order();
        const { list, count } = await order.query(status, { page, pageSize }); 
        this.renderJSON({code:0, list, count});
    }
    async detail(){
        const { id } = this.request.body;
        const order = new Order();
        const detail = await order.detail(id);
        this.renderJSON({ code:0, detail });
    }
}