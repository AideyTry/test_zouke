const BaseOrder = require('./BaseOrder');

module.exports = class PayStream extends BaseOrder {

    //提交付款信息(并生成付款流水)
    async commit(id,user,provider,extras,paytime){

        //得到collection对象
        const collection = await this.$getCollection();

        //根据条件查找orderDoc
        const orderDoc = await collection.findOne({
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
        }, { collection_info:1, status:1 });

        //不存在
        if(!orderDoc) return false;

        //解构赋值拿到collection_info、status字段
        const { collection_info, status:preStatus,allot_list } = orderDoc;

        //构造pay_stream对象
        const pay_stream= {
            "collection_info":collection_info,
            "provider":provider,
            "extras":extras,
            "paytime":paytime
        };

        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                status:preStatus
            },
            {
                //把发起的等待收款删除掉
                $unset:{
                    collection_info:1
                },
                //更新状态码
                $set: {
                    status: allot_list ? this.status.WAIT_FOR_BOOKING : this.status.WAIT_FOR_ROOM_PERSON
                },
                //插入构造好的pay_stream对象
                $push: {
                    pay_stream: this.$createShiftUpdate(pay_stream),
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
                status:{ $in:[
                    this.status.WAIT_FOR_GATHERING,
                    this.status.WAIT_FOR_ROOM_PERSON,
                    this.status.WAIT_FOR_BOOKING,
                    this.status.ORDER_RESOLVE
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
                status:{ $in:[
                    this.status.WAIT_FOR_GATHERING,
                    this.status.WAIT_FOR_ROOM_PERSON,
                    this.status.WAIT_FOR_BOOKING,
                    this.status.ORDER_RESOLVE
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