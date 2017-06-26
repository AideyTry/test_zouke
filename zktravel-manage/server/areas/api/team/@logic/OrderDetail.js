const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const orderRule = {
    "*orders":[
        {
            "*hotels":[
                {
                    "*hotel":{
                        "*name":"酒店名"
                    },
                    "*suppliers":{
                        "*supplier_name":"供应商名字",
                        "*at_number":"入住编号",
                        "*rooms":[{
                            "*type":"房型"
                        }]
                    }
                },
                {min:1}
            ]
        },
        {min:1}
    ],
    "*suppliers":[
        {
            "*total_cost":"总成本价",
            "*cancel_policy":null,
            "*pay_policy":[{
                "*pay_date":"需要支付",
                "*number":"数字"
            }]
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
                "booking_user.id":user.id,
                /**订单状态校验：in/nin **/
                 status:{ $in:[
                    this.status.WAIT_FOR_GATHERING,
                    this.status.WAIT_FOR_ROOM_PERSON,
                    this.status.WAIT_FOR_BOOKING
                ]}
            },
            {
                //插入数据
                $set:{
                    order_detail:{
                        orders: order_obj,
                    },
                    status:this.status.ORDER_RESOLVE
                },
                $push: {
                    //日志记录
                    logs: this.$createShiftUpdate({ type: 'user:save_order', time: this.$createTime(), user })
                }
            }
        )
    }
};