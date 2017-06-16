const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');

const priceRule = {
    '*cases':[
        {
            '*booking_channel':'订房政策',
            '*payment_policy': '付款政策',
            '*cancel_policy': '取消政策',
            remark: '备注',
            price: [
                {
                    '*hotel': { '*name': '' },
                    '*rooms': [
                        { '*price':{ '*cost': 100, '*bk': 120, '*quoted': 110 } },
                        { min: 1 }
                    ]
                },
                {min: 1}
            ]
        },
        { min: 1 }
    ]
}

module.exports = class Price extends BaseOrder {
    validPrice(price){
        return compare(priceRule, price);
    }
    async commit(id, requirementLastTime, price, user ){
        const nowTime = this.$createTime();
        price.last_update = nowTime;

        return await this.$update(
            {   
                _id: id, 'requirement.last_update': requirementLastTime, 
                status: this.status.WAIT_FOR_GIVE_PRICE,
                'booking_user.id': user.id
            },
            { 
                $set: { status: this.status.WAIT_FOR_PRICE_CHECK, price },
                $push: { 
                    logs: { type: 'system:commit-price', time: nowTime, user}
                }
            }
        );
    }

    async reject(id, user, reason){
        return await this.$update(
            {
                _id:id,
                status: this.status.WAIT_FOR_PRICE_CHECK
            },
            {
                $set: { status: this.status.WAIT_FOR_GIVE_PRICE },
                $push: {
                    logs: { type: 'system:reject-price', time: this.$createTime(), user, reason}
                }
            }

        )
    }
    async resolve(id, user, userPolicy, price){
        const nowTime = this.$createTime();
        const update = {
            $set: { user_policy: userPolicy, status: this.status.WAIT_FOR_GATHERING },
            $push: {
                logs: { type: 'system:resolve-price', time: nowTime, user, change_price: !!price }
            }
        }
        if(price){
            price.last_update = nowTime;
            update.$set.price = price;
        }else{
            const queryResult = await (await this.$getCollection()).findOne({
                 _id:id, status: this.$status.WAIT_FOR_PRICE_CHECK });
            if(!queryResult) return null;
            price = queryResult.price;
        }
        update.$push.price_history = price;
        
        return await this.$update({
            _id: id,
            status: this.status.WAIT_FOR_PRICE_CHECK
        }, update);
    }

    async agree(){

    }
    async disagree(){

    }
    
    async agreePrice(id, result, logUser, price ){
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