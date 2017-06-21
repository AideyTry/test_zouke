const dbclient = requireRoot('dbclient');
const BaseOrder = require('./BaseOrder');

module.exports = class PayStream extends BaseOrder {
    //插入数据
    async update(id,road,reMark,payTime){
        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                /**订单状态校验：in/nin **/
                status:{ $nin:[
                    this.status.WAIT_FOR_PUBLISH,
                    this.status.WAIT_FOR_DISPATCH,
                    this.status.WAIT_FOR_GIVE_PRICE,
                    this.status.WAIT_FOR_PRICE_CHECK,
                    this.status.WAIT_FOR_PRICE_CONFIRM,
                ]}
            },
            { $push:
                {
                    pay_stream:{
                        road: road,
                        remark: reMark,
                        payTime: payTime
                    }
                }
            }
        )
    }
};