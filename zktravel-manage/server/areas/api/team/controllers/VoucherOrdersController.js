const TeamController = require('../TeamController');
const VoucherOrders = require('../@logic/VoucherOrders');

module.exports = class OrderController extends TeamController {
    async query(page=0, pageSize=10){

        let user = this.$getUser();
        let uid = user.id;

        const voucherOrders = new VoucherOrders();
        const { list, count } = await voucherOrders.query(uid, { page, pageSize });
        this.renderJSON({code:0, list, count});
    }
};