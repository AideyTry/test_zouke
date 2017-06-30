const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

module.exports = class Voucher extends BaseOrder {

    //发票数据校验
    validVoucherObj(voucher_obj){
        return compare(voucherRule, voucher_obj);
    }

    //数据入库
    async commit(id,user,voucher_obj){

        voucher_obj["user"]=user;
        voucher_obj["date"]=this.$createTime();

        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                "creator.id":user.id
            },
            {
                $push: {
                    voucher_details:voucher_obj,
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'user:write_voucher', time: this.$createTime(), user })
                }
            }
        )
    }
};