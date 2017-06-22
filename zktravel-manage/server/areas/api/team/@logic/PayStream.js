const BaseOrder = require('./BaseOrder');

module.exports = class PayStream extends BaseOrder {
    async update(id,user,provider,extras,paytime){
        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                "creator.id":user.id,
                /**订单状态校验：in/nin **/
                status:{ $nin:[
                    this.status.WAIT_FOR_PUBLISH,
                    this.status.WAIT_FOR_DISPATCH,
                    this.status.WAIT_FOR_GIVE_PRICE,
                    this.status.WAIT_FOR_PRICE_CHECK,
                    this.status.WAIT_FOR_PRICE_CONFIRM,
                ]}
            },
            {
                //插入数据
                $push: {
                    pay_stream:{
                        provider: provider,
                        extras: extras,
                        pay_time: paytime
                    },
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'user:pay_stream', time: this.$createTime(), user })
                }
            }
        )
    }
};