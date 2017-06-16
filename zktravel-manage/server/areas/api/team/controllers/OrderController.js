const TeamController = require('../TeamController');
const Order = require('../@logic/Order');

module.exports = class OrderController extends TeamController {
    async query(page, pageSize, status){
        const order = new Order();
        const { list, count } = await order.query(status, { page, pageSize }); 
        this.renderJSON({code:0, list, count});
    }
    async detail(id){
        const order = new Order();
        const detail = await order.detail(id);
        this.renderJSON({ code:0, detail });
    }
    async log(id, message){
        const order = new Order();
        const result = order.log(id, this.$getUser(), message);
        if(result) this.renderJSON({ code:0 });
        else this.renderJSON({ code:2, msg:"can not log" });
    }
}