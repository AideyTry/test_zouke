const dbclient = requireRoot('dbclient');
const BaseOrder = require('./BaseOrder');

module.exports = class PayStream extends BaseOrder {
    async update(id,road,remark){
        return await this.$update(
            {
                _id: id,
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
                        creat_time: this.$createTime(),
                        way: road,
                        remark: remark
                    }
                }
            }
        )
    }
};