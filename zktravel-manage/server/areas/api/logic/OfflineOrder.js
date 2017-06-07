const dbclient = requireRoot('db');

module.exports = class OfflineOrder {
    async query(status, uid){
        const db = await dbclient.get();

        const collection = await db.collection('offline_order');
        const cursor = collection.find({status, 'creator.id': uid}, {
            'requirement.user.name': 1,
            'requirement.priority': 1,
            'requirement.start_date': 1,
            'status': 1,
            'create_time': 1
        });
        const list = await cursor.toArray();

        return list.map(item=>{
            return {
                orderId: item._id,
                userName: item.requirement.user.name,
                priority: item.requirement.priority,
                startDate: item.requiremtn.start_date,
                status: item.status,
                publishTime: item.create_time
            };
        });
    }
    async detail(id){
        const db = await dbclient.get();
        const collection = await db.collection('offline-order');
        return await collection.findOne({ _id: id })
    }
}