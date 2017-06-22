const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const orderRule = {
    '*country': [
        {
            "*hotels":[
                {
                    "*hotel_name":"酒店名",
                    "remark_confirm":"备注信息",
                    "*suppliers":[
                        {
                            "*supplier_name":"渠道名",
                            "*room_type":"房型",
                            "*status":1,
                            "rooms":[
                                {
                                    "type":"Single",
                                    "number":1,
                                    "room_description":"房间描述",
                                    "peoples":[
                                        {
                                            "name":"名",
                                            "family_name":"姓",
                                            "gender":"性别"
                                        },
                                        {min:1}
                                    ]
                                },
                                {min:1}
                            ]
                        },
                        {min:1}
                    ]
                },
                {min:1}
            ]
        },
        {min: 1}
    ]
};

module.exports = class OrderDetail extends BaseOrder {
    //订单数据校验
    validOrder(order){
        return compare(orderRule, order);
    }

    //数据入库
    async update(user,id,order){
        /**方法前面带$的说明是从父类继承来的**/
        return await this.$update(
            {
                _id: id,
                // "booking_user.id":user.id,
                /**订单状态校验：in/nin **/
                //  status:{ $nin:[
                //     this.status.WAIT_FOR_PUBLISH,
                //     this.status.WAIT_FOR_DISPATCH,
                //     this.status.WAIT_FOR_GIVE_PRICE,
                //     this.status.WAIT_FOR_PRICE_CHECK,
                //     this.status.WAIT_FOR_PRICE_CONFIRM,
                //     this.status.WAIT_FOR_GATHERING,
                //     this.status.WAIT_FOR_ROOM_PERSON,
                //     this.status.ORDER_RESOLVE
                // ]}
            },
            {
                //插入数据
                $push: {
                    order_detail:{
                        orders: order,
                    },
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'user:save_order', time: this.$createTime(), user })
                }
            }
        )
    }
};