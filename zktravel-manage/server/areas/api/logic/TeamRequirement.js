const BaseOfflineOrder = require('./BaseOfflineOrder');
const compare = require('@local/compare');


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
            '*city': {},
            'hotel': {},
            '*rooms': [
                { '*type': 'type', '*number': 1, 'mark': 'mark' },
                { min:1 }
            ]
        },
        { min:1 }
    ]
}


module.exports = class TeamRequirement extends BaseOfflineOrder {
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
        return await this.$insert(data, 2, creator);
    }
    async draft(data, creator){
        return await this.$insert(data, 1, creator);
    }
    async draftPublish(id, requirement){
        const set = {
            status: 2
        }
        if(requirement){
            requirement.last_update = this.$createTime();
            set.requirement = requirement;
        }
        return await this.$update({_id:id, status: 1}, { $set: set });
    }
    async update(id, requirement){
        const collection = await this.$getCollection();
        const { status } = await collection.findOne({id:_id}, { status:1 })
        if(![1,2,3,4,5].includes(status)){
            //已付款之后
            return -1 //无法
        }

        requirement.last_update = this.$createTime();

        const update = {
            $set: { requirement }
        };
        if(status === 1 || status === 2){
            //待发布
        }

        return await this.$update({ _id:id, status }, {
            $set: { requirement }
        })
    }
}