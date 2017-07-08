const TeamController = require('../TeamController');
const RefundStream = require('../@logic/RefundStream');

module.exports = class RefundStreamController extends TeamController {

    //约定许可证
    $meta(){
        return {
            access: {
                'refund': {
                    'offline_order': this.P.OFFLINE_ORDER.REFUND
                }
            }
        }
    }

    //退款信息(生成流水)
    async refund(id,refund_obj){
        const refundStream = new RefundStream();
        let user = this.$getUser();

        refund_obj = refundStream.validRefundObj(refund_obj);

        if(!refund_obj){
            return this.renderJSON({ code:1, msg: 'data check valid fail' });
        }
        const result = await refundStream.refund(id,user,refund_obj);

        if(!result){
            return this.renderJSON({ code:2, msg:'can not entry refund stream' });
        }
        this.renderJSON({code:0});
    }
};