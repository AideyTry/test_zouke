const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');
const clone = require('lodash/cloneDeep');

const priceRule = {
    '*cases':[
        {
            '*sp_policy':{
                '*booking_channel':'订房政策',
                '*payment': '付款政策',
                '*cancel': '取消政策',
                remark: '备注',
            },
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

const priceWithUserPolicyRule = clone(priceRule);
priceWithUserPolicyRule['*cases'][0]['*user_policy'] = {
    '*payment': [
        {
            '*dead_line': '2017-08-08',
            '*price': 200
        },
        { min:1 }
    ],
    '*cancel': '取消政策',
    'explain': '报价说明'
};

module.exports = class Price extends BaseOrder {
    validPrice(price){
        return compare(priceRule, price);
    }
    validUserPolicy(price){
        return compare(priceWithUserPolicyRule, price);
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
                    logs: this.$createShiftUpdate({ type: 'system:commit-price', time: nowTime, user})
                }
            }
        );
    }

    async reject(id, user, reason){
        const queryResult = await (await this.$getCollection()).findOne({
            _id:id, status: this.status.WAIT_FOR_PRICE_CHECK
        });
        if(!queryResult) return false;

        const { price, price_history=[], requirement } = queryResult;
        price.requirement = requirement;
        price.check_pass = false;
        price.id = `${this.$createDate()}(${price_history.length+1})`;

        return await this.$update(
            {
                _id:id,
                status: this.status.WAIT_FOR_PRICE_CHECK
            },
            {
                $set: { status: this.status.WAIT_FOR_GIVE_PRICE },
                $push: {
                    logs: this.$createShiftUpdate({ type: 'system:reject-price', time: this.$createTime(), user, reason}),
                    price_history: this.$createShiftUpdate(price)
                }
            }
        );
    }
    async resolve(id, user, price){
        const nowTime = this.$createTime();

        price.last_update = nowTime;
        const update = {
            $set: { price: Object.assign({}, price), status: this.status.WAIT_FOR_PRICE_CONFIRM },
            $push: {
                logs: this.$createShiftUpdate({ type: 'system:resolve-price', time: nowTime, user, change_price: !!price })
            }
        }

        const queryResult = await (await this.$getCollection()).findOne({
                 _id:id, status: this.status.WAIT_FOR_PRICE_CHECK });
        if(!queryResult) return false;
        const { price_history=[], requirement } = queryResult;

        price.requirement = requirement;
        price.check_pass = true;
        price.id = `${this.$createDate()}(${price_history.length})`;
        update.$push.price_history =  this.$createShiftUpdate(price);

        return await this.$update({
            _id: id,
            status: this.status.WAIT_FOR_PRICE_CHECK
        }, update);
    }

    async agree(id, userSelectCase, user){
        return this.$update(
            {
                _id: id,
                status: this.status.WAIT_FOR_PRICE_CONFIRM,
                'creator.id': user.id,
                'price_history.0': { $exists: true }
            },
            {
                $set: { 
                    status: this.status.WAIT_FOR_GATHERING,
                    user_select_case: userSelectCase,
                    'price_history.0.confirm_pass': true
                },
                $push: {
                    logs: this.$createShiftUpdate({ type: 'system:agree-price', time: this.$createTime(), user })
                }
            }
        )
    }
    async disagree(id, user){
        return this.$update(
            {
                _id: id,
                status: this.status.WAIT_FOR_PRICE_CONFIRM,
                'creator.id': user.id,
                'price_history.0': { $exists: true }
            },
            {
                $set: { 
                    status: this.status.WAIT_FOR_GIVE_PRICE,
                    'price_history.0.confirm_pass': false
                },
                $push: {
                    logs: this.$createShiftUpdate({ type: 'system:disagree-price', time: this.$createTime(), user })
                }
            }
        )
    }
}