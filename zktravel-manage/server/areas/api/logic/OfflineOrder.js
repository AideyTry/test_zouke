const dbclient = requireRoot('db');

module.exports = class OfflineOrder {
    async query(status, { creatorId, bookingId, page=0, pageSize=10 } = {}){
        const db = await dbclient.get();
        const collection = await db.collection('offline_order');

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
        const db = await dbclient.get();
        const collection = await db.collection('offline_order');
        const detail = await collection.findOne({ _id: id })
        detail.id = detail._id;
        delete detail._id;
        return detail;
    }
}