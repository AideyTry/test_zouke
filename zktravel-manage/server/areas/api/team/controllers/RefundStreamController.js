const TeamController = require('../TeamController');
const RefundStream = require('../@logic/RefundStream');

module.exports = class MyPayStreamController extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                'commit': {
                    'offline_order': this.P.OFFLINE_ORDER.GATHERING
                }
            }
        }
    }

    //录入退款信息(生成流水)
    async refund(id,refund_obj){
        const refundStream = new RefundStream();
        //拿到当前用户信息，更新表的时候做id校验
        let user = this.$getUser();
        /***
         * 进行业务逻辑之前，要根据业务需求来判断是否需要进行数据校验,不通过直接驳回请求。
         ****/
        refund_obj = refundStream.validRefundObj(refund_obj);
        //表单信息校验失败
        if(!refund_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await refundStream.refund(id,user,refund_obj);
        //数据库操作失败
        if(!result){
            return this.renderJSON({ code:2, msg:'can not entry refund stream' });
        }
        //数据库操作成功
        this.renderJSON({code:0});
    }
};