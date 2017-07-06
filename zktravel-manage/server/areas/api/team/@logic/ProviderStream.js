const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const objRule = {
    "*reason":"退款原因",
    "*cost":"退款金额"
};

module.exports = class ProviderStream extends BaseOrder {

    //供应商对象校验
    validProviderObj(provider_obj){
        return compare(objRule, provider_obj,{strict:true});
    }

    //退款
    async edit(id,user,provider_obj){

        provider_obj["time"] = this.$createTime();
        provider_obj["user"] = user;

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
                    provider_stream:{provider_obj},
                    logs: this.$createShiftUpdate({ type: 'user:provider_stream', time: this.$createTime(), user })
                }
            }
        )
    }

};