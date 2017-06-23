const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const objRule = {
    "*reason":"退款原因",
    "*refund_time":"退款时间",
    "*is_cancel":true,
    "*path":"渠道",
    "*currency":"币种",
    "*money":"金额"
};

module.exports = class RefundStream extends BaseOrder {

    //退款对象校验
    validRefundObj(refund_obj){
        return compare(objRule, refund_obj);
    }

    //退款
    async refund(id,user,refund_obj){

        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                "creator.id":user.id,
                /**订单状态校验：in/nin **/
                status:{ $in:[
                    this.status.WAIT_FOR_GATHERING,
                    this.status.WAIT_FOR_ROOM_PERSON,
                    this.status.WAIT_FOR_BOOKING,
                    this.status.ORDER_RESOLVE
                ]}
            },
            {
                $push:{
                    refund_stream:refund_obj,
                    logs: this.$createShiftUpdate({ type: 'user:refund_stream', time: this.$createTime(), user })
                }
            }
        )
    }

};