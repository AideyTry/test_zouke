const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const voucherRule = {
    "*company":"公司名",
    "*country":"国家名",
    "*address":"地址",
    "*voucher_type":"发票类型",
    "*currency":"币种",
    "*money":"金额"
};

module.exports = class WriteVoucher extends BaseOrder {

    //发票数据校验
    validVoucherObj(voucher_obj){
        return compare(voucherRule, voucher_obj);
    }

    //数据入库
    async commit(id,user,voucher_obj){
        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                "creator.id":user.id
                /**订单状态校验：in/nin **/
                // status:{ $in:[
                //     this.status.WAIT_FOR_GATHERING,
                //     this.status.WAIT_FOR_ROOM_PERSON,
                //     this.status.WAIT_FOR_BOOKING,
                //     this.status.ORDER_RESOLVE
                // ]}
            },
            {
                //插入数据
                $set:{
                    voucher_detail:voucher_obj,
                },
                $push: {
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'user:write_voucher', time: this.$createTime(), user })
                }
            }
        )
    }
};