const BaseOrder = require('./BaseOrder');

module.exports = class Order extends BaseOrder {
    async query(status, { creatorId, bookingId, page=0, pageSize=10 } = {}){
        const collection = await this.$getCollection();

        const findQuery = Array.isArray(status)?{ status: {$in:status} }:{ status };
        if(creatorId) findQuery['creator.id']=creatorId;
        if(bookingId) findQuery['booking_user.id']=bookingId;

        const count = await collection.find(findQuery).count()

        const cursor = collection.find(findQuery, {
            'requirement.user.name': 1,
            'requirement.priority': 1,
            'requirement.start_date': 1,
            'status': 1,
            'create_time': 1
        }).skip(page*pageSize).limit(pageSize);

        const list = await cursor.toArray();

        return { 
            count, 
            list: list.map(item=>{
                return {
                    orderId: item._id,
                    userName: item.requirement.user.name,
                    priority: item.requirement.priority,
                    startDate: item.requirement.start_date,
                    status: item.status,
                    publishTime: item.create_time
                };
            })
        };
    }
    async detail(id){
        const collection = await this.$getCollection();
        const detail = await collection.findOne({ _id: id });
        if(!detail) return null;
        detail.id = detail._id;
        delete detail._id;
        return detail;
    }

    async dispatch(id, user, dead_line, logUser){
        //分配
        return await this.$update({ _id:id, status:this.status.WAIT_FOR_DISPATCH }, { 
            $set: { booking_user: user, booking_dead_line: dead_line, status:this.status.WAIT_FOR_GIVE_PRICE },
            $push: { logs: { type: 'system:dispatch-requirement', time: this.$createTime(), user:logUser } } 
        });
    }

    async log(id, user, msg){
        return this.$update({ _id:id }, {
            $push: { logs:{ type: 'user:message', time:this.$createTime(), user, message: msg } }
        })
    }
}