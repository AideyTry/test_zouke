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
    async commit(id, requirementLastTime, price, logUser ){
        const nowTime = this.$createTime();
        price.last_update = nowTime;

        return await this.$update(
            {   
                _id: id, 'requirement.last_update': requirementLastTime, 
                status: this.status.WAIT_FOR_GIVE_PRICE
            },
            { 
                $set: { status: this.status.WAIT_FOR_PRICE_CHECK, price },
                $push: { 
                    logs: { type: 'system:commit-price', time: nowTime, user: logUser}
                }
            }
        );
    }
    
    async checkPrice(id, result, logUser, price ){
        /*
        const nowTime = this.$createTime();
        const update = {
            $set: {},
            $push: {}
        };
        if(result){
            update.$set.status = this.status.WAIT_FOR_PRICE_CONFIRM;
            if(price){
                price.last_update = nowTime;
                update.$set.price = price;
            }
        }else{
            update.$set.status = this.status.WAIT_FOR_GIVE_PRICE;
        }
        return await this.$update({
            _id: id,
            status: this.status.WAIT_FOR_PRICE_CHECK
        },{
            
        })
        */
    }

    confirmPrice(id, confirm){

    }
}