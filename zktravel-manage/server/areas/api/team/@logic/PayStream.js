const BaseOrder = require('./BaseOrder');

module.exports = class PayStream extends BaseOrder {

    //提交付款信息
    async commit(id,user,provider,extras,paytime){
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

    //发起一笔收款
    async collection(id,user,reo,currency,money){
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
                $set: {
                    collection_info:{
                        reo: reo,
                        currency: currency,
                        money: money
                    },
                },
                $push:{
                    logs: this.$createShiftUpdate({ type: 'user:collection_info', time: this.$createTime(), user })
                }
            }
        )
    }

    //取消发起的收款
    async cancel(id,user){
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
                //删除数据
                $unset: {
                    collection_info:{},
                },
                $push:{
                    logs: this.$createShiftUpdate({ type: 'user:cancel_collection_info', time: this.$createTime(), user })
                }
            }
        )
    }


};