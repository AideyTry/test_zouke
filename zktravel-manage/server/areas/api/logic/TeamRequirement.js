const dbclient = requireRoot('db');
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


module.exports = class TeamRequirement {
    async $getCollection(){
        const db = await dbclient.get();
        return await db.collection('offline_order');
    }
    async $insert(requirement, status, creator){
        const collection = await this.$getCollection();
        const today = new Date().format('YYMMDD');
        const idReg = new RegExp(`^T${today}`);
        const maxIdResult = await collection.find({_id: idReg}, {_id: 1}).sort({ _id: -1 }).next();

        const date = new Date().format('YYYY-MM-DD hh:mm:ss');
        requirement.last_update = date;

        const nextId = maxIdResult ? `T${today}${ 
            (parseInt(maxIdResult._id.substr(today.length+1)) + 1).toString().padStart(3, '0')
        }` : `T${today}001`;

        await collection.insertOne({
            _id: nextId,
            status,
            create_time: date,
            last_update: date,
            creator,
            requirement
        });
        return nextId;
    }
    async validRequirement(data){
        data = compare( validReqDataRule, data, { filter: false } )
    }
    async publish(data, creator){
        return await this.$insert(data, 2, creator);
    }
    async draft(data, creator){
        return await this.$insert(data, 1, creator);
    }
}