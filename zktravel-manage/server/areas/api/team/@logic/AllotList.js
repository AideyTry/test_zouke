const BaseOrder = require('./BaseOrder');

module.exports = class AllotList extends BaseOrder {

    //数据入库
    async allot_list(id,user,content){

        const collection = await this.$getCollection();
        //看该订单是否已付款
        const order = await collection.findOne({
            '_id': id
        }, {_id:1, pay_stream:1, status:1});

        if(!order) return false;

        const update = {
            $set:{
                allot_list:{
                    content: content,
                }
            },
            $push: {
                logs: this.$createShiftUpdate({ type: 'system:allot-list', time: this.$createTime(), user })
            }
        };

        //如果有支付信息，更改status
        if(order.pay_stream&&order.pay_stream.length>0&&order.status!==this.status.ORDER_RESOLVE){
            update.$set.status = this.status.WAIT_FOR_BOOKING;
        }

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
            },update

        )
    }
};