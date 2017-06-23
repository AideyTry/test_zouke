const BaseOrder = require('./BaseOrder');

module.exports = class AllotList extends BaseOrder {

    //数据入库
    async allot_list(id,user,content){
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
                $set:{
                    allot_list:{
                        content: content,
                    },
                    status:this.status.WAIT_FOR_BOOKING
                },
                $push: {
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'system:allot_list', time: this.$createTime(), user })
                }
            }
        )
    }
};