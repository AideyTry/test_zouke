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
    commit(id, logUser, requirementLastTime, price ){
        const nowTime = this.$createTime();
        price.last_update = nowTime;
        return this.$update(
            {   
                _id: id, 'requirement.last_update': requirementLastTime, 
                status: this.status.WAIT_FOR_GIVE_PRICE
            },
            { 
                $set: Object.assign({ status: this.status.WAIT_FOR_PRICE_CHECK }, price?{price}: {}),
                $push: { logs: { type: 'system:commit-price', time: nowTime, user: logUser} }
            }
        );
    }
    /*
     * @params
     *      price: true | false | priceObject
    */
    checkPrice(id, price){

    }

    confirmPrice(id, confirm){

    }
}