const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const orderRule = {
    "*orders":[
        {
            "*hotels":[
                {
                    "*name":"酒店名",
                    "*hotel":{
                        "*supplier":{
                            "*supplier_name":"供应商名字",
                            "*at_number":"入住编号",
                            "*room_type":"房型"
                        }
                    }
                },
                {min:1}
            ]
        },
        {min:1}
    ],
    "*suppliers":[
        {
            "*supplier_name":"渠道名",
            "*total_cost":"总成本价",
            "*cancle_policy":"取消政策",
            "*pay_policy":"付款政策"
        },
        {min:1}
    ]
};

module.exports = class OrderDetail extends BaseOrder {
    //订单数据校验
    validOrder(order_obj){
        return compare(orderRule, order_obj);
    }

    //数据入库
    async update(user,id,order_obj){
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
                        orders: order_obj,
                    },
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'user:save_order', time: this.$createTime(), user })
                }
            }
        )
    }
};