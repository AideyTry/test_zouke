const LController = requireRoot('common/LController');
const Order = require('../@logic/Order');

module.exports = class OrderController extends LController {
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
        const { id: uid, name: uname, role, roleName } = this.userInfo;
        const result = order.log(id, { id:uid, uname:uname, role, role_name }, message);
    }
}