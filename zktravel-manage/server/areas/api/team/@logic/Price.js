const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const priceRule = {
    '*cases':[
        [
            {
                '*hotel': { '*name': '' },
                '*rooms': [
                    { '*price':{ '*cost': 100, '*bk': 120, '*quoted': 110 } },
                    { min: 1 }
                ]
            },
            {min: 1}
        ],
        { min: 1 }
    ]
}

module.exports = class Price extends BaseOrder {
    validPrice(price){
        return compare(priceRule, price);
    }
    update(id, requirementLastTime, price){
        price.last_update = this.$createTime();
        return this.$update(
            { _id: id, 'requirement.last_update': requirementLastTime, 
                status: this.status.WAIT_FOR_GIVE_PRICE },
            { $set:{ price } }
        );
    }
    async commit(id, logUser, requirementLastTime, /*opt*/price ){
        const nowTime = this.$createTime();
        if(!price){
            const order = await (await this.$getCollection()).find({
                _id: id,
                status: this.status.WAIT_FOR_GIVE_PRICE,
                price:{$ne: null}
            });
            if(!order) return false;
            price = order.price;
        }else{
            price.last_update = nowTime;
        }
        return await this.$update(
            {   
                _id: id, 'requirement.last_update': requirementLastTime, 
                status: this.status.WAIT_FOR_GIVE_PRICE
            },
            { 
                $set: Object.assign({ status: this.status.WAIT_FOR_PRICE_CHECK }, price ),
                $push: { 
                    logs: { type: 'system:commit-price', time: nowTime, user: logUser},
                    price_history: price
                }
            }
        );
    }
    /*
     * @params
     *      price: true | false | priceObject
    */
    checkPrice(id, result, price){

    }

    confirmPrice(id, confirm){

    }
}