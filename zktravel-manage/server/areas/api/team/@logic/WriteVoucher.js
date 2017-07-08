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
        const result =  compare(voucherRule, voucher_obj);

        console.log(compare.getLastError());
        return result;
    }

    //数据入库
    async commit(id,user,voucher_obj){

        voucher_obj["user"]=user;
        voucher_obj["date"]=this.$createTime();

        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id
            },
            {
                $push: {
                    voucher_details:voucher_obj,
                    logs: this.$createShiftUpdate({ type: 'user: write-voucher', time: this.$createTime(), user })
                }
            }
        )
    }
};