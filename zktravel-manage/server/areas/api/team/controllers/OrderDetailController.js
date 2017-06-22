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
    async save(order){
        const orderDetail = new OrderDetail();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        order = orderDetail.validOrder(order);
        //表单信息校验失败
        if(!order){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }

        const result = await orderDetail.update(user,order);
        //数据库操作失败
        if(!result){
           return this.renderJSON({ code:2, msg:'can not save order detail' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};