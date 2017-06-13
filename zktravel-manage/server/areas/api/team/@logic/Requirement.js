const BaseOrder = require('./BaseOrder');
const compare = require('@local/compare');
const jsondiffpatch = require('jsondiffpatch');


const validReqDataRule = {
    '*priority': 'priority_level',
    '*origin_from':'from',
    '*user': {
        '*id': 1,
        '*name': 'name',
        '*avatar': 'img_url'
    },
    '*number': 3,
    '*start_date': '2017-07-07',
    '*star': 'star',
    '*breakfast': true,
    '*currency': 'EUR',
    '*budget_min': 200,
    '*budget_max': 1000,
    'budget_mark': 'mark',
    'cancel_req': 'cancel_req',
    'position_req': 'position_req',
    'other_req': 'other_req',
    '*stay_details': [
        {
            '*check_in': '2017-07-08',
            '*check_out': '2017-07-09',
            '*city': { '*code':123, '*name':'name' },
            'hotel': { '*name': '' },
            '*rooms': [
                { '*type': 'type', '*number': 1, 'mark': 'mark' },
                { min:1 }
            ]
        },
        { min:1 }
    ]
}


module.exports = class TeamRequirement extends BaseOrder {
    async $insert(requirement, status, creator){
        requirement.last_update = this.$createTime();

        return await super.$insert({
            creator,
            status,
            requirement,
        });
    }
    validRequirement(data){
        return compare( validReqDataRule, data );
    }
    async publish(data, creator){
        return await this.$insert(data, this.status.WAIT_FOR_DISPATCH, creator);
    }
    async draft(data, creator){
        return await this.$insert(data, this.status.WAIT_FOR_PUBLISH, creator);
    }
    async draftPublish(id, requirement){
        const set = {
            status: this.status.WAIT_FOR_DISPATCH
        }
        if(requirement){
            requirement.last_update = this.$createTime();
            set.requirement = requirement;
        }
        return await this.$update({_id:id, status: this.status.WAIT_FOR_PUBLISH}, { $set: set });
    }
    async update(id, requirement, user, all){
        const collection = await this.$getCollection();
        
        const { 
            WAIT_FOR_PUBLISH,
            WAIT_FOR_DISPATCH, 
            WAIT_FOR_GIVE_PRICE, 
            WAIT_FOR_PRICE_CHECK,
            WAIT_FOR_PRICE_CONFIRM,
            WAIT_FOR_GATHERING
        } = this.status;

        const query = { _id: id, status: 
            {
                $in: [
                    WAIT_FOR_PUBLISH,
                    WAIT_FOR_DISPATCH, 
                    WAIT_FOR_GIVE_PRICE, 
                    WAIT_FOR_PRICE_CHECK,
                    WAIT_FOR_PRICE_CONFIRM,
                    WAIT_FOR_GATHERING
                ]
            }
        };
        const result = await collection.findOne(query, { status:1, requirement:1, creator:1, price_history:1 })
        if(!result) return -1 //已付款之后,无法更改需求
        const { status, requirement:_oldRequirement, creator, price_history } = result;


        if(!all&&creator.id!==user.id){
            return -2 //无权
        }

        const nowTime = this.$createTime();

        const updateQuery = {
            _id: id,
            status
        };
        const update = {
            $set: { requirement },
            $unset: { price: 1 }
        };
        if(price_history&&price_history.length>0){
            updateQuery['price_history.disable_apply'] = { $in: [ null, true, false ] };
            update.$set['price_history.$.disable_apply'] = true;
        }
        if(status !== WAIT_FOR_PUBLISH && status !== WAIT_FOR_DISPATCH){
            update.$set.status = WAIT_FOR_GIVE_PRICE;
            delete _oldRequirement.last_update;
            const diff = jsondiffpatch.diff(_oldRequirement, requirement);
            update.$push = { logs: { type: 'system:update-requirement', time: nowTime, diff, user } };
        }

        requirement.last_update = nowTime;

        return await this.$update(updateQuery, update)
    }
}