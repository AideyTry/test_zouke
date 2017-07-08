const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

module.exports = class PayStream extends BaseOrder {

    //发起收款
    async collection(id,user,reo,currency,money){
        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                /**订单状态校验：in/nin **/
                status:{ $in:[
                    this.status.WAIT_FOR_GATHERING,
                    this.status.WAIT_FOR_ROOM_PERSON,
                    this.status.WAIT_FOR_BOOKING,
                    this.status.ORDER_RESOLVE
                ]}
            },
            {
                $set: {
                    collection_info: {
                        reo: reo,
                        currency: currency,
                        money: money
                    },
                },
                $push:{
                    logs: this.$createShiftUpdate({ type: 'user:collection-info', time: this.$createTime(), user })
                }
            }
        )
    }

    //取消收款
    async cancel(id,user){
        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                /**订单状态校验：in/nin **/
                status:{ $in:[
                    this.status.WAIT_FOR_GATHERING,
                    this.status.WAIT_FOR_ROOM_PERSON,
                    this.status.WAIT_FOR_BOOKING,
                    this.status.ORDER_RESOLVE
                ]}
            },
            {
                $unset: {
                    collection_info:{},
                },
                $push:{
                    logs: this.$createShiftUpdate({ type: 'user:cancel-collection-info', time: this.$createTime(), user })
                }
            }
        )
    }

    //录入收款信息(生成流水)
    async commit(id,user,provider,extras,paytime){

        const collection = await this.$getCollection();
        const orderDoc = await collection.findOne({
            _id: id,
            /**订单状态校验：in/nin **/
            status:{ $nin:[
                this.status.WAIT_FOR_PUBLISH,
                this.status.WAIT_FOR_DISPATCH,
                this.status.WAIT_FOR_GIVE_PRICE,
                this.status.WAIT_FOR_PRICE_CHECK,
                this.status.WAIT_FOR_PRICE_CONFIRM,
            ]}
        }, { collection_info:1, status:1, allot_list:1 });

        //没有发起收款
        if(!orderDoc) return false;
        const { collection_info, status: preStatus, allot_list } = orderDoc;

        if(!collection_info) return false;

        const pay_stream= {
            "collection_info":collection_info,
            "provider":provider,
            "extras":extras,
            "paytime":paytime,
            "user":user
        };

        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                status: preStatus
            },
            {
                $unset:{
                    collection_info:1
                },
                $set: preStatus===this.status.ORDER_RESOLVE ? {} : {
                    status: allot_list ? this.status.WAIT_FOR_BOOKING : this.status.WAIT_FOR_ROOM_PERSON
                },
                $push: {
                    pay_stream: this.$createShiftUpdate(pay_stream),
                    logs: this.$createShiftUpdate({ type: 'user:pay-stream', time: this.$createTime(), user })
                }
            }
        )
    };

};