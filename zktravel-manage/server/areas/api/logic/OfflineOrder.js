const dbclient = requireRoot('db');

module.exports = class OfflineOrder {
    async query(status, uid){
        const db = await dbclient.get();

        const collection = await db.collection('offline_order');
        return await collection.find({status, 'creator.id': uid}).toArry();
    }
}