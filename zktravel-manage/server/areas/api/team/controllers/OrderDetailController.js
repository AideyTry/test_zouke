const TeamController = require('../TeamController');
const OrderDetail = require('../@logic/OrderDetail');

module.exports = class OrderDetailController extends TeamController {
    //约定许可证
    $meta(){
        return {
            access: {
                'save': {
                    'offline_order': this.P.OFFLINE_ORDER.UPDATE_ORDER
                }
            }
        }
    }
    //保存订单信息
    async save(id,order_obj){
        const orderDetail = new OrderDetail();
        let user = this.$getUser();

        order_obj = orderDetail.validOrder(order_obj);

        if(!order_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await orderDetail.update(user,id,order_obj);

        if(!result){
           return this.renderJSON({ code:2, msg:'can not save order detail' });
        }
        this.renderJSON({code:0});
    }
};