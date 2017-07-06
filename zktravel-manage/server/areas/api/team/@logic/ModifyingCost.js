const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const objRule = {
    "*supplier_name": "供应商",
    "*reason": "修改原因",
    "*cost": 100
};

module.exports = class ModifyingCost extends BaseOrder {

    //供应商对象校验
    validModifyingCost(Modifying_obj){
        return compare(objRule, Modifying_obj,{strict:true});
    }

    //退款
    async commit(id,user,Modifying_obj){

        Modifying_obj["time"] = this.$createTime();
        Modifying_obj["user"] = user;

        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                /**订单状态校验：in/nin **/
                status:{ $in:[
                    this.status.WAIT_FOR_BOOKING,
                    this.status.ORDER_RESOLVE
                ]}
            },
            {
                $push:{
                    modifyCost_list: Modifying_obj,
                    logs: this.$createShiftUpdate({ type: 'user: modifyingCost', time: this.$createTime(), user })
                }
            }
        )
    }

};