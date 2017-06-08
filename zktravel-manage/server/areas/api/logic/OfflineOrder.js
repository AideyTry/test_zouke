const BaseOfflineOrder = require('./BaseOfflineOrder');

module.exports = class OfflineOrder extends BaseOfflineOrder {
    async query(status, { creatorId, bookingId, page=0, pageSize=10 } = {}){
        const collection = await this.$getCollection();

        const findQuery = { status };
        if(creatorId) findQuery['creator.id'];

        const cursor = collection.find(findQuery, {
            'requirement.user.name': 1,
            'requirement.priority': 1,
            'requirement.start_date': 1,
            'status': 1,
            'create_time': 1
        }).skip(page*pageSize).limit(pageSize);

        const list = await cursor.toArray();

        return list.map(item=>{
            return {
                orderId: item._id,
                userName: item.requirement.user.name,
                priority: item.requirement.priority,
                startDate: item.requirement.start_date,
                status: item.status,
                publishTime: item.create_time
            };
        });
    }
    async detail(id){
        const collection = await this.$getCollection();
        const detail = await collection.findOne({ _id: id })
        detail.id = detail._id;
        delete detail._id;
        return detail;
    }

    async invalidReq(id){
        //需求审核不通过 
        return await this.$update({ _id: id, status: 2 }, { 
            $set: { status: 1 },
            $push: { logs: { type:'system:reject-requirement', time: this.$createTime() } }
        });
    }

    async dispatch(id, user){
        //分配
        return await this.$update({ _id:id, status:2 }, { 
            $set: { booking_user: user },
            $push: { logs: { type:'system:dispatch-requirement', time: this.$createTime() } } 
        });
    }
}